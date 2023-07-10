//SPDX-License-Identifier: MIT
import NonFungibleToken from 0x1d7e57aa55817448
import Digiyo from 0xae3baa0d314e546b

// This transaction transfers a instance to a recipient

// This transaction is how a digiyo user would transfer a instance
// from their account to another account
// The recipient must have a Digiyo Collection object stored
// and a public DigiyoNFTCollectionPublic capability stored at
// `Digiyo.collectionPublicPath`

// Parameters:
//
// recipient: The Flow address of the account to receive the instance.
// withdrawID: The id of the instance to be transferred

transaction(recipient: Address, withdrawID: UInt64) {

    // local variable for storing the transferred token
    let transferToken: @NonFungibleToken.NFT
    
    prepare(acct: AuthAccount) {

        // borrow a reference to the owner's collection
        let collectionRef = acct.borrow<&Digiyo.Collection>(from: Digiyo.collectionStoragePath)
            ?? panic("Could not borrow a reference to the stored Instance collection")
        
        // withdraw the NFT
        self.transferToken <- collectionRef.withdraw(withdrawID: withdrawID)
    }

    execute {
        
        // get the recipient's public account object
        let recipient = getAccount(recipient)

        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(Digiyo.collectionPublicPath).borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()!

        // deposit the NFT in the receivers collection
        receiverRef.deposit(token: <-self.transferToken)
    }
}