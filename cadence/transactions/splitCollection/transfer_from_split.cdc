//SPDX-License-Identifier: MIT
import NonFungibleToken from 0x1d7e57aa55817448
import Digiyo from 0xae3baa0d314e546b
import DigiyoSplitCollection from 0xae3baa0d314e546b
import DigiyoAdminReceiver from 0xae3baa0d314e546b

// This transaction deposits an NFT to a recipient

// Parameters
//
// recipient: the Flow address who will receive the NFT
// instanceID: instance ID of NFT that recipient will receive

transaction(recipient: Address, instanceID: UInt64) {

    let transferToken: @NonFungibleToken.NFT
    
    prepare(acct: AuthAccount) {

        self.transferToken <- acct.borrow<&DigiyoSplitCollection.SplitCollection>(from: DigiyoAdminReceiver.splitCollectionPath)!.withdraw(withdrawID: instanceID)
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