//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This transaction is what an admin would use to mint a single new instance
// and deposit it in a user's collection

// Parameters:
//
// setID: the ID of a set containing the target asset
// assetID: the ID of a asset from which a new instance is minted
// recipientAddr: the Flow address of the account receiving the newly minted instance

transaction(setID: UInt32, assetID: UInt32, recipientAddr: Address) {
    // local variable for the admin reference
    let adminRef: &Digiyo.Admin

    prepare(acct: AuthAccount) {
        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)!
    }

    execute {
        // Borrow a reference to the specified set
        let setRef = self.adminRef.borrowSet(setID: setID)

        // Mint a new NFT
        let instance1 <- setRef.mintInstance(assetID: assetID)

        // get the public account object for the recipient
        let recipient = getAccount(recipientAddr)

        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(Digiyo.collectionPublicPath).borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
            ?? panic("Cannot borrow a reference to the recipient's instance collection")

        // deposit the NFT in the receivers collection
        receiverRef.deposit(token: <-instance1)
    }
}