//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This transaction mints multiple instances 
// from a single set/asset combination (otherwise known as edition)

// Parameters:
//
// setID: the ID of the set to be minted from
// assetID: the ID of the Asset from which the Instances are minted 
// quantity: the quantity of Instances to be minted
// recipientAddr: the Flow address of the account receiving the collection of minted instances

transaction(setID: UInt32, assetID: UInt32, quantity: UInt64, recipientAddr: Address) {

    // Local variable for the digiyo Admin object
    let adminRef: &Digiyo.Admin

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)!
    }

    execute {

        // borrow a reference to the set to be minted from
        let setRef = self.adminRef.borrowSet(setID: setID)

        // Mint all the new NFTs
        let collection <- setRef.batchMintInstance(assetID: assetID, quantity: quantity)

        // Get the account object for the recipient of the minted tokens
        let recipient = getAccount(recipientAddr)

        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(Digiyo.collectionPublicPath).borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
            ?? panic("Cannot borrow a reference to the recipient's collection")

        // deposit the NFT in the receivers collection
        receiverRef.batchDeposit(tokens: <-collection)
    }
}