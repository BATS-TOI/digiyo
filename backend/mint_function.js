// Code needs to be run server side as private keys are utilized.
// This implementation uses Nodejs on AWS Lambda, but you can use any server side implementation.

const AWS = require('aws-sdk')
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);
const sdk = require("@onflow/sdk");
const fcl = require("@onflow/fcl");
const types = require("@onflow/types");
const { SHA3 } = require("sha3");
var EC = require('elliptic').ec;
var ec = new EC('p256');
const ADMIN_ADDRESS = process.env.ADMIN_ADDRESS;
const dynamoDBSuffix = process.env.DYNAMODB_SUFFIX;
const KEY_ID = 0;
var KEY_ID_ITERABLE = 0;
const cadenceCode = {
    createAsset : `
        //SPDX-License-Identifier: MIT
        import Digiyo from 0xae3baa0d314e546b
        transaction(metadata: {String: String}) {
            let adminRef: &Digiyo.Admin
            let currAssetID: UInt32
            prepare(acct: AuthAccount) {
                self.currAssetID = Digiyo.nextAssetID;
                self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
                    ?? panic("No admin resource in storage")
            }
            execute {
                self.adminRef.createAsset(metadata: metadata)
            }
            post {
                Digiyo.getAssetMetaData(assetID: self.currAssetID) != nil:
                    "assetID doesnt exist"
            }
        }
    `,
    addAssetToSet : `
        //SPDX-License-Identifier: MIT
        import Digiyo from 0xae3baa0d314e546b
        transaction(setID: UInt32, assetID: UInt32) {
            let adminRef: &Digiyo.Admin
            prepare(acct: AuthAccount) {
                self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
                    ?? panic("Could not borrow a reference to the Admin resource")
            }
            execute {
                let setRef = self.adminRef.borrowSet(setID: setID)
                setRef.addAsset(assetID: assetID)
            }
            post {
                Digiyo.getAssetsInSet(setID: setID)!.contains(assetID): 
                    "set does not contain assetID"
            }
        }
    `,
    batchMintTransfer : `
        //SPDX-License-Identifier: MIT
        import Digiyo from 0xae3baa0d314e546b
        transaction(setID: UInt32, assetID: UInt32, quantity: UInt64, recipientAddr: Address) {
            let adminRef: &Digiyo.Admin
            prepare(acct: AuthAccount) {
                self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)!
            }
            execute {
                let setRef = self.adminRef.borrowSet(setID: setID)
                let collection <- setRef.batchMintInstance(assetID: assetID, quantity: quantity)
                let recipient = getAccount(recipientAddr)
                let receiverRef = recipient.getCapability(Digiyo.collectionPublicPath).borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
                    ?? panic("Cannot borrow a reference to the recipient's collection")
                receiverRef.batchDeposit(tokens: <-collection)
            }
        }
    `,
    retireAsset : `
        //SPDX-License-Identifier: MIT
        import Digiyo from 0xae3baa0d314e546b
        transaction(setID: UInt32, assetID: UInt32) {
            let adminRef: &Digiyo.Admin
            prepare(acct: AuthAccount) {
                self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
                    ?? panic("No admin resource in storage")
            }
            execute {
                let setRef = self.adminRef.borrowSet(setID: setID)
                setRef.retireAsset(assetID: assetID)
            }
            post {
                self.adminRef.borrowSet(setID: setID).retired[assetID]!: 
                    "asset is not retired"
            }
        }
    `
}

fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org",
  "discovery.authn.api": "https://fcl-discovery.onflow.org/api/authn",
  "fcl.limit": 9999
})

const hashMsg = (msg) => {
    const sha = new SHA3(256);
    sha.update(Buffer.from(msg, "hex"));
    return sha.digest();
};

const signWithKey = (msg) => {
    const privateKey = process.env.PRIVATE_KEY;
    const key = ec.keyFromPrivate(Buffer.from(privateKey, "hex"));
    const sig = key.sign(hashMsg(msg));
    const n = 32;
    const r = sig.r.toArrayLike(Buffer, "be", n);
    const s = sig.s.toArrayLike(Buffer, "be", n);
    return Buffer.concat([r, s]).toString("hex");
};

const authorizationFunction = async (account) => {
    return {
        ...account,
        tempId: `${ADMIN_ADDRESS}-${KEY_ID}`,
        addr: fcl.sansPrefix(ADMIN_ADDRESS),
        keyId: Number(KEY_ID),
        signingFunction: async signable => {
            return {
                addr: fcl.withPrefix(ADMIN_ADDRESS),
                keyId: Number(KEY_ID),
                signature: signWithKey(signable.message)
            }
        }
    }
}

const authorizationFunctionProposer = async (account) => {
    if (KEY_ID_ITERABLE >= 1001 || KEY_ID_ITERABLE < 2) {
        KEY_ID_ITERABLE = 2;
    } else {
        KEY_ID_ITERABLE++;
    }
    return {
        ...account,
        tempId: `${ADMIN_ADDRESS}-${KEY_ID_ITERABLE}`,
        addr: fcl.sansPrefix(ADMIN_ADDRESS),
        keyId: Number(KEY_ID_ITERABLE),
        signingFunction: async signable => {
            return {
                addr: fcl.withPrefix(ADMIN_ADDRESS),
                keyId: Number(KEY_ID_ITERABLE),
                signature: signWithKey(signable.message)
            }
        }
    }
}

const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    }
});

async function createItem(params){
    try {
      return await docClient.put(params).promise()
    } catch (e) {
      return e;
    }
}

async function queryItems(params){
    try {
      return await docClient.query(params).promise()
    } catch (e) {
      return e
    }
}

async function updateItem(params){
    try {
      return await docClient.update(params).promise()
    } catch (e) {
      return e
    }
}

async function copyS3(params) {
    try {
        return await s3.copyObject(params).promise()
    } catch (e) {
        return e
    }
}

async function deleteS3(params) {
    try {
        return await s3.deleteObject(params).promise()
    } catch (e) {
        return e
    }
}

async function moveS3(level, user, oldName, newName) {
    try {
        const copyRes = await copyS3({
            Bucket: process.env.AWS_BUCKET_NAME,
            CopySource: `${process.env.AWS_BUCKET_NAME}/${level}/${user}/${oldName}`,
            Key: `${level}/${user}/${newName}`
        });
        const deleteRes = await deleteS3({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${level}/${user}/${oldName}`
        });
        return {copyRes : copyRes, deleteRes : deleteRes }
    } catch (e) {
        return e
    }
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
    let instanceIDs = [];
    let structure = {};
    try {
        const body = JSON.parse(event.body);
        console.log(`BODY: ${JSON.stringify(body)}`);
        
        try {
            if (body['collectors']) {
                
                return {
                    statusCode: 200,
                    body: JSON.stringify(structure)
                };
            }
        } catch (e) {
            console.log(`Failed to create ${JSON.stringify(testParams)} \n ERROR: ${JSON.stringify(e)}`);
        }
        
        const fileName = body.fileName;
        const filePath = body.level + '/' + body.flowAddr + '/' + fileName;
        structure['minter'] = body.flowAddr;
        structure['name'] = body.title;
        structure['description'] = body.description;
        structure['quantity'] = body.quantity;
        structure['redemption'] = body.redemption;
        structure['mediaType'] = body.mediaType;

        /* read from s3 */
        try {
            let s3Stream = s3.getObject({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: filePath
            }).createReadStream();
            s3Stream.path = filePath;
            
            const options = {
                pinataMetadata: {
                    name: fileName,
                    keyvalues: {
                        name: fileName
                    }
                },
                pinataOptions: {
                    cidVersion: 0
                }
            };
    
            const filePinRes = await pinata.pinFileToIPFS(s3Stream, options);
            structure['CID'] = filePinRes.IpfsHash;
        } catch (e) {
            console.log(`ERROR: ${JSON.stringify(e)}`);
            return {
                statusCode: 200,
                body: JSON.stringify({ ERROR : e, STRUCTURE : structure })
            };
        }
        
        
        /* createAsset */
        try {
            const structArr = Object.entries(structure).map(([k, v]) => { return { key : `${k}`, value : `${v}`}; });
            const createAsset = await fcl.mutate({
                cadence: cadenceCode['createAsset'],
                payer: authorizationFunction,
                args: (arg, t) => [arg(structArr, t.Dictionary({ key: t.String, value: t.String }))],
                proposer: authorizationFunctionProposer,
                authorizations: [authorizationFunction]
            });
            let createAssetSealed = await fcl.tx(createAsset).onceSealed();
            console.log(`createAssetSealed: ${JSON.stringify(createAssetSealed)}`)
            structure['assetID'] = createAssetSealed.events[0].data.id;
        } catch (e) {
            console.log(`ERROR: ${JSON.stringify(e)}`);
            return {
                statusCode: 200,
                body: JSON.stringify({ ERROR : e, STRUCTURE : structure })
            };
        }
        
        /* addAssetToSet */
        try {
            const addAssetToSet = await fcl.mutate({
                cadence: cadenceCode['addAssetToSet'],
                payer: authorizationFunction,
                args: (arg, t) => [
                    arg("4", t.UInt32),
                    arg(`${structure['assetID']}`, t.UInt32)
                ],
                proposer: authorizationFunctionProposer,
                authorizations: [authorizationFunction]
            });
            let addAssetToSetSealed = await fcl.tx(addAssetToSet).onceSealed();
            console.log(`addAssetToSetSealed: ${JSON.stringify(addAssetToSetSealed)}`)
        } catch (e) {
            console.log(`ERROR: ${JSON.stringify(e)}`);
            return {
                statusCode: 200,
                body: JSON.stringify({ ERROR : e, STRUCTURE : structure })
            };
        }
        
        /* batchMintTransfer */
        try {
            const batchMintTransfer = await fcl.mutate({
                cadence: cadenceCode['batchMintTransfer'],
                payer: authorizationFunction,
                args: (arg, t) => [
                    arg("4", t.UInt32),
                    arg(`${structure['assetID']}`, t.UInt32),
                    arg(`${structure['quantity']}`, t.UInt64),
                    arg(structure['minter'], t.Address)
                ],
                proposer: authorizationFunctionProposer,
                authorizations: [authorizationFunction]
            });
            let batchMintTransferSealed = await fcl.tx(batchMintTransfer).onceSealed();
            console.log(`batchMintTransferSealed: ${JSON.stringify(batchMintTransferSealed)}`)
            instanceIDs = batchMintTransferSealed.events.filter( e => e.type == `A.${process.env.ADMIN_ADDRESS}.${process.env.CONTRACT_NAME}.InstanceMinted`).map( e => Number(e.data.instanceID));
        } catch (e) {
            console.log(`ERROR: ${JSON.stringify(e)}`);
            return {
                statusCode: 200,
                body: JSON.stringify({ ERROR : e, STRUCTURE : structure })
            };
        }
        
        /* retireAsset */
        try {
            const retireAsset = await fcl.mutate({
                cadence: cadenceCode['retireAsset'],
                payer: authorizationFunction,
                args: (arg, t) => [
                    arg("4", t.UInt32),
                    arg(`${structure['assetID']}`, t.UInt32)
                ],
                proposer: authorizationFunctionProposer,
                authorizations: [authorizationFunction]
            });
            let retireAssetSealed = await fcl.tx(retireAsset).onceSealed();
            console.log(`retireAssetSealed: ${JSON.stringify(retireAssetSealed)}`)
        } catch (e) {
            console.log(`ERROR: ${JSON.stringify(e)}`);
            return {
                statusCode: 200,
                body: JSON.stringify({ ERROR : e, STRUCTURE : structure })
            };
        }

        /* putMints */
        try {
            const awsTimeStamp = Math.round(Date.now())
            const awsDateTime = new Date().toISOString()
            const mintParams = {
                TableName : `Mints${dynamoDBSuffix}`,
                Item: {
                    id: context.awsRequestId,
                    assetID : structure['assetID'],
                    CID : structure['CID'],
                    instances : instanceIDs,
                    quantity : structure['quantity'],
                    name : structure['name'],
                    minter: structure['minter'],
                    description: structure['description'],
                    redemption: structure['redemption'],
                    mediaType: structure['mediaType'],
                    __typename: 'Mints',
                    _version: 1,
                    _lastChangedAt: awsTimeStamp,
                    createdAt: awsDateTime,
                    updatedAt: awsDateTime
                }
            };
            const mintRes = await createItem(mintParams);
            console.log(`mintParams ${JSON.stringify(mintParams)}, mintRes: ${JSON.stringify(mintRes)}`);
        } catch (e) {
            console.log(`ERROR: ${JSON.stringify(e)}`);
            return {
                statusCode: 200,
                body: JSON.stringify({ ERROR : e, STRUCTURE : structure })
            };
        }
        
        /* updateUsers */
        try {
            const queryParams = {
                TableName: `Users${dynamoDBSuffix}`,
                IndexName: 'flowAddr-index',
                KeyConditionExpression: '#a = :v',
                ExpressionAttributeNames: { '#a': 'flowAddr' },
                ExpressionAttributeValues: { ':v': structure['minter'] }  
            }
              
            const queryRes = await queryItems(queryParams);
            console.log(`queryParams: ${JSON.stringify(queryParams)}, queryRes: ${JSON.stringify(queryRes)}`);

            const newNFTs = [{ [structure['CID']] : { instances : instanceIDs, metadata : structure } }]
            
            const updateParams = {
                TableName: `Users${dynamoDBSuffix}`,
                Key: { id : queryRes.Items[0].id },
                UpdateExpression: 'set #a1 = :v1, #a2 = :v2',
                ExpressionAttributeNames: { '#a1' : 'minted', '#a2' : 'owned' },
                ExpressionAttributeValues: { ':v1' : queryRes.Items[0].minted.concat(newNFTs), ':v2' : queryRes.Items[0].owned.concat(newNFTs) }
            };
            const updateRes = await updateItem(updateParams);
            console.log(`updateParams: ${JSON.stringify(updateParams)}, updateRes: ${JSON.stringify(updateRes)}`);
        } catch (e) {
            console.log(`ERROR: ${JSON.stringify(e)}`);
            return {
                statusCode: 200,
                body: JSON.stringify({ ERROR : e, STRUCTURE : structure })
            };
        }
        
        /* moveS3 */
        try {
            const moveRes = await moveS3(body.level, structure['minter'], fileName, structure['CID']);
            console.log(`moveParams: (${body.level}, ${structure['minter']}, ${fileName}, ${structure['CID']}), moveRes: ${JSON.stringify(moveRes)}`);
        } catch (e) {
            console.log(`ERROR: ${JSON.stringify(e)}`);
            return {
                statusCode: 200,
                body: JSON.stringify({ ERROR : e, STRUCTURE : structure })
            };
        }

        /* log final structure */
        try {
            console.log(`final structure: ${JSON.stringify({...structure, [instanceIDs] : instanceIDs})}`)
        } catch (e) {
            console.log(`ERROR: ${JSON.stringify(e)}`)
        }

        return {
            statusCode: 200,
            body: JSON.stringify(structure)
        };
    } catch (e) {
        console.log(`ERROR: ${JSON.stringify(e)}`)
        structure['event'] = event;
        return {
            statusCode: 200,
            body: JSON.stringify({ ERROR : e, STRUCTURE : structure })
        };
    }
    
};
