import { API, Storage, graphqlOperation } from 'aws-amplify';
import { Flex } from '@aws-amplify/ui-react';
import * as mutations from '../src/graphql/mutations';
import * as queries from '../src/graphql/queries';
import * as subscriptions from '../src/graphql/subscriptions';
import NftGrid from '../components/NftGrid'
import { cadenceScripts } from './cadenceScripts';
import { saleCuts } from './saleCuts'
import * as fcl from '@onflow/fcl';
import html2canvas from 'html2canvas';
import '../flowConfig'

export const delay = ms => new Promise(res => {setTimeout(res, ms); console.log(`waited ${ms} ms in ${__dirname} ${__filename}`)});

export const setDict = async (e, type, setter) =>  {
  const { name, value } = e.currentTarget || e.target
  setter(
    prevState => ({
      ...prevState, [name]: type =='Number' ? Number(value) : value
    })
  )
}

export async function getAllGQL (table, filter={}, limit=50000) {
  return (await API.graphql( { query: queries[`list${table}`], variables:{limit: limit, filter: filter } } )).data[`list${table}`].items
}

export async function putItemGQL (table, item) {
  return await API.graphql(graphqlOperation(mutations[`create${table}`], { input: item }))
}

export async function updateItemGQL (table, item) {
  return await API.graphql(graphqlOperation(mutations[`update${table}`], {input: item}))
}

export async function putUniqueItemGQL (table, item, attributes) {
  const matches = await getAllGQL(table, { and: attributes.map( (a) => ({ [a]: { eq: item[a] } }) ) });
  if (matches.length == 0) {
      return await putItemGQL(table, item)
  } else if (matches.length == 1) {
      return await updateItemGQL(table, { id: matches[0].id, ...item, _version: matches[0]._version })
      
  } else {
      return matches
  }
}

export async function deleteItemGQL (table, item, attributes) {
  const matches = await getAllGQL(table, { and: attributes.map( (a) => ({ [a]: { eq: item[a] } }) ) });
  if (matches.length == 0) {
    return null;
  } else if (matches.length == 1) {
    return await API.graphql(graphqlOperation(mutations[`delete${table}`], { input: { id : matches[0].id, _version: matches[0]._version } }))
  } else {
    return null;
  }
}

export async function postData(data) {
  const response = await fetch('https://5qoel7f6aqe3dcd2i3xl47p6ee0lwmpr.lambda-url.us-east-1.on.aws/', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.json();
}

async function getS3(name) {
  return await Storage.get(name)
}

async function putS3 (name, img, level, contentType) {
  return await Storage.put(name, img, { level: level, contentType: contentType });
}

async function moveS3(oldPath, oldName, newPath, newName) {
  const copy = await Storage.copy({ key : `${oldPath}/${oldName}` }, { key : `${newPath}/${newName}` })
  const remove = await Storage.remove(`${oldPath}/${oldName}` )
  return { 'copy' : copy, 'remove' : remove }
}

async function getAddr () {
  return (await fcl.currentUser().snapshot()).addr
}

async function checkAspect (aspect) {
  const addr = await getAddr()
  const RES = await cadenceScripts(`${aspect}/check_account`);
  const results = await fcl.query({
    cadence: RES,
    args: (arg, t) => [arg(addr, t.Address)]
  });
  let verdict;
  if (results == "true") {
    verdict = true;
  } else {
    verdict = false;
  }
    return verdict;
}

async function prepAspect (aspect) {
  const PREP_TRANSACTION = await cadenceScripts(`${aspect}/setup_account`);
  const transaction = await fcl.mutate({
    cadence: PREP_TRANSACTION,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz]
  });
  const sealed = await fcl.tx(transaction).onceSealed();
}

async function enforce (aspect) {
  let compliant = await checkAspect(aspect);
  while (compliant === false){
    await prepAspect(aspect);
    compliant = await checkAspect(aspect);
  }
}

async function cacheUser (flowAddr, supplied=false) {
  const matches = await getAllGQL('Users', { flowAddr: { eq: flowAddr } })
  if (matches.length === 0) {
    const nfts = await getNFTs(flowAddr)
    const userDetails = {
      flowAddr: flowAddr,
      name: flowAddr,
      owned: nfts,
      bought: [],
      sold: [],
      minted: []
    };
    return await putItemGQL('Users', userDetails)
  } else if (matches.length === 1) {
    const nfts = await getNFTs(matches[0].flowAddr)
    if (!supplied) {
      const userDetails = {
        id: matches[0].id,
        owned: nfts,
        _version: matches[0]._version
      };
      return await updateItemGQL('Users', userDetails)
    } else if (supplied.role == "seller") {
      const userDetails = {
        id: matches[0].id,
        owned: nfts,
        sold: JSON.stringify(supplied.item),
        _version: matches[0]._version
      };
      return await updateItemGQL('Users', userDetails)
    } else if (supplied.role == "buyer") {
      const userDetails = {
        id: matches[0].id,
        owned: nfts,
        bought: JSON.stringify(supplied.item),
        _version: matches[0]._version
      };
      return await updateItemGQL('Users', userDetails)
    } else {
      return matches;
    }
  } else {
    return matches
  }
}

export async function getSingleNFT (CID, pinata=true) {
  return pinata ? `https://digiyo.mypinata.cloud/ipfs/${CID}` : await getS3(`${(await getAllGQL('Mints', { CID : { eq : CID }}))[0].minter}/${CID}`)
}

export async function getUsers () {
  return await getAllGQL('Users')
}

export async function getFighters () {
  return await getAllGQL('Fighters')
}

export async function getMints (filter={}) {
  try {
    const mints = await getAllGQL('Mints', filter)
    let newthings = []
    for (const i of mints) {
      const url = await getS3(`${i.minter}/${i.CID}`)
      newthings.push({CID:i.CID, instances: i.instances, metadata:i, url:url})
    }
    return newthings
  } catch (e) {
    console.log(e)
    return []
  }
  
}

export async function getListings () {
  try {
    const listings = await getAllGQL('Listings')
    let newthings = []
    for (const i of listings) {
      const item = JSON.parse(i.item)
      if (!i._deleted) {
        const url = await getS3(`${item.minter}/${item.CID}`)
        newthings.push({
          listingInfo: {
            storefrontID : i.storefrontID,
            price : i.price,
            seller : i.seller
          },
          metadata: item,
          url: url
        })
      }
    }
    return newthings
  } catch (e) {
    console.log(e)
    return []
  }
  
}

export async function getRecentSales () {
  try {
    const listings = await getAllGQL('Sales')
    let newthings = []
    for (const i of listings) {
      const item = JSON.parse(i.item)
      const url = await getS3(`${item.minter}/${item.CID}`)
      newthings.push({
        saleInfo:{
          storefrontID : i.storefrontID,
          price : i.price,
          seller : i.seller,
          buyer: i.buyer
        },
        metadata:item,
        url:url
      })
    }
    return newthings
  } catch (e) {
    console.log(e)
    return []
  }
  
}

export async function getNFTs (a, idList=false) {
  try {
    const get_collection_ids_cdc = await cadenceScripts(`user/get_collection_ids`);
    const get_metadata_cdc = await cadenceScripts(`user/get_metadata`);
    const ids = idList ? idList : await fcl.query({ cadence: get_collection_ids_cdc, args: (arg, t) => [arg(a, t.Address)] });
    let CIDS = {}
    for (let i = 0; i < ids.length; i++) {
      const metadata = await fcl.query({ cadence: get_metadata_cdc, args: (arg, t) => [arg(a, t.Address), arg(`${ids[i]}`, t.UInt64)] });
      const cid = metadata['CID'];
      if (cid in CIDS) {
        CIDS[cid].instances.push(ids[i])
      } else {
        CIDS[cid] = { instances: [ids[i]], metadata: metadata }
      }
    }
    return Object.entries(CIDS).map( i => JSON.stringify({ [i[0]] : i[1] }) )
  } catch (e) {
    console.log(e)
    return []
  }
    
}

export async function getCollection (a) {
  try {
    if (!a) {
      return []
    }
    const matches = await getAllGQL('Users', { flowAddr : { eq : a } })
    const things = matches.length > 0 ? matches[0].owned : []
    let newthings = []
    for (const i of things) {
        const parsed = Object.entries(JSON.parse(i))[0]
        const url = await getS3(`${parsed[1].metadata.minter}/${parsed[0]}`)
        newthings.push({CID:parsed[0], instances:parsed[1].instances, metadata:parsed[1].metadata, url:url})
    }
    return newthings
  } catch (e) {
    console.log(e)
    return []
  }
  
}

export const displayGrid = (list, mode, mobile) => {
  return (
        list
        ?
        <NftGrid sx={{ margin: 'auto' }} itemData={list} mode={mode} mobile={mobile} />
        :
        <NftGrid sx={{ margin: 'auto' }} itemData={[]} mode={mode} mobile={mobile} />
  )
}

export const walletConnect = async (currentAddress) => {
    if (currentAddress) {
        fcl.unauthenticate()
    } else {
        await fcl.authenticate()
        try {
          await enforce('storefront');
          await enforce('user');
          const user = await cacheUser(await getAddr())
        } catch (e) {
          console.log(e)
        }
    }
}

const blobber = async () => {
  const canvas = await html2canvas(document.getElementById('target-canvas'));
  let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  return imageBlob
}

const validate = async (flowAddr, title, description) => {
  if (!flowAddr){ await fcl.authenticate(); return false; }
  else if (!title) { alert('Please add a title to mint.'); return false; }
  else if (!description){ alert('Please add a description to mint.'); return false;}
  else { return true; }
}

export async function mint (file, flowAddr, title, description, redemption, quantity, confettiBomb) {
  if (!(await validate(flowAddr, title, description))) {
    return;
  } else {
    try {
      confettiBomb()
      const contentType = file.type.split('/')[0] == 'video' ? "video/*" : "image/*"
      const content = contentType == "video/*" ? file : await blobber();
      const security = 'public';
      const s3put = await putS3(`${flowAddr}/${file.name}`, content, security, contentType)
      const mintRes = await postData({
        flowAddr : flowAddr,
        title : title,
        description : description,
        redemption : redemption,
        mediaType : contentType.split('/')[0],
        fileName : file.name,
        level : security,
        quantity: quantity.toString()
      })
      console.log('mintRes', mintRes)
      return;
    } catch (e) {
      console.log(e)
      return;
    }
  }
}

export async function postForSale (item, quantity, price, schema) {
  try {
    const cuts = await saleCuts(schema)
    const cadence = await cadenceScripts(`storefront/sell_items_fusd`);
    const transactionID = await fcl.mutate({
      cadence: cadence,
      args: (arg, t) => [
          arg(item.instances.slice(0, quantity).map(i => `${i}`), t.Array(t.UInt64)),
          arg(`${price}`, t.UFix64),
          arg(cuts[0], t.Address),
          arg(cuts[1], t.Address),
          arg(cuts[2], t.Address),
          arg(cuts[3], t.Address)
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz]
    });
    const transaction = await fcl.tx(transactionID).onceSealed();
    for (let i = 0; i < quantity; i++) {
      const listing = await putItemGQL('Listings', {
        price : price,
        item : JSON.stringify({id:item.instances[i], ...item.metadata}),
        storefrontID: transaction.events[i].data.listingResourceID,
        seller: transaction.events[i].data.storefrontAddress
      })
    }
    
  } catch (e) {
    console.log(e)
  }
}

export async function buyItem (listingResourceID, sellerAddress, price, item, currency) {
  const saleType = currency == 'fusd' ? `storefront/buy_item_fusd` : `storefront/buy_item`;
  const buyerAddress = await getAddr()
  try {
    const cadence = await cadenceScripts(saleType);
    const transactionID = await fcl.mutate({
      cadence: cadence,
      args: (arg, t) => [
          arg(listingResourceID, t.UInt64),
          arg(sellerAddress, t.Address)
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz]
    });
    const transaction = await fcl.tx(transactionID).onceSealed();
    const seller = await cacheUser(sellerAddress, {role: "seller", item:item})
    const buyer = await cacheUser(buyerAddress, {role: "buyer", item:item})
    const deleteRes = await deleteItemGQL('Listings', {...item, storefrontID: listingResourceID}, ['storefrontID'])
    
    const putRes = await putItemGQL('Sales', {
      price: price,
      item: JSON.stringify(item),
      storefrontID: listingResourceID,
      seller: sellerAddress,
      buyer: buyerAddress
    })
  } catch (e) {
    console.log(e)
  }
  
}

export async function getStorefrontListings (a) {
  const read_storefront_ids = await cadenceScripts(`storefront/read_storefront_ids`);
  const read_listing_details = await cadenceScripts(`storefront/read_listing_details`);
  const ids = await fcl.query({ cadence: read_storefront_ids, args: (arg, t) => [arg(a, t.Address)] });
  let listings = []
  for(const storefrontID of ids) {
    listings.push(await fcl.query({ cadence: read_listing_details, args: (arg, t) => [arg(a, t.Address), arg(storefrontID, t.UInt64)] }))
  }
  return listings
}

export async function removeStorefrontListings(a) {
  try {
    const read_storefront_ids = await cadenceScripts(`storefront/read_storefront_ids`);
    const read_listing_details = await cadenceScripts(`storefront/read_listing_details`);
    const remove_item = await cadenceScripts(`storefront/remove_item`);
    const ids = await fcl.query({ cadence: read_storefront_ids, args: (arg, t) => [arg(a, t.Address)] });
    for(const storefrontID of ids) {
      const details = await fcl.query({ cadence: read_listing_details, args: (arg, t) => [arg(a, t.Address), arg(storefrontID, t.UInt64)] });
      const removal = await fcl.mutate({
        cadence: remove_item,
        args: (arg, t) => [arg(storefrontID, t.UInt64)],
        payer: fcl.authz,
        proposer: fcl.authz,
        authorizations: [fcl.authz]
      });
      const transactionSealed = await fcl.tx(removal).onceSealed();
    }
  } catch (e) {
    console.log(e)
  }
}

export async function transferNFTs (recipient, idList=false) {
  try {
    const sender = await getAddr()
    const cadence = await cadenceScripts(`user/batch_transfer`);
    const get_collection_ids_cdc = await cadenceScripts(`user/get_collection_ids`);
    const ids = idList ? idList : await fcl.query({ cadence: get_collection_ids_cdc, args: (arg, t) => [arg(sender, t.Address)] });
    const user = (await getAllGQL('Users', { flowAddr: { eq: sender } }))[0]
    
    const transactionID = await fcl.mutate({
      cadence: cadence,
      args: (arg, t) => [
          arg(recipient, t.Address),
          arg(ids, t.Array(t.UInt64))
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz]
    });
    const transaction = await fcl.tx(transactionID).onceSealed();
    console.log(transaction);

    const updateOwned = await updateItemGQL('Users', {
      id: user.id,
      owned: [],
      _version: user._version
    })
  } catch (e) {
    console.log(e)
  }
}