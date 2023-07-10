//SPDX-License-Identifier: MIT
import NonFungibleToken from 0x1d7e57aa55817448
import Digiyo from 0xae3baa0d314e546b
import DigiyoSplitCollection from 0xae3baa0d314e546b
import DigiyoAdminReceiver from 0xae3baa0d314e546b

// This transaction is what Digiyo uses to send the instances in a "pack" to
// a user's collection

// Parameters:
//
// recipientAddr: the Flow address of the account receiving a pack of instances
// instancesIDs: an array of instance IDs to be withdrawn from the owner's instance collection

transaction(recipientAddr: Address, instanceIDs: [UInt64]) {

    prepare(acct: AuthAccount) {
        
        // get the recipient's public account object
        let recipient = getAccount(recipientAddr)

        // borrow a reference to the recipient's instance collection
        let receiverRef = recipient.getCapability(Digiyo.collectionPublicPath)
            .borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
            ?? panic("Could not borrow reference to receiver's collection")

        

        // borrow a reference to the owner's instance collection
        if let collection = acct.borrow<&DigiyoSplitCollection.SplitCollection>(from: DigiyoAdminReceiver.splitCollectionPath) {
            
            receiverRef.batchDeposit(tokens: <-collection.batchWithdraw(ids: instanceIDs))
        } else {

            let collection = acct.borrow<&Digiyo.Collection>(from: Digiyo.collectionStoragePath)! 

            // Deposit the pack of instances to the recipient's collection
            receiverRef.batchDeposit(tokens: <-collection.batchWithdraw(ids: instanceIDs))

        }
    }
}