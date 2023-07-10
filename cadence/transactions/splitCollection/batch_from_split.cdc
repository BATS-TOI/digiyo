//SPDX-License-Identifier: MIT
import NonFungibleToken from 0x1d7e57aa55817448
import Digiyo from 0xae3baa0d314e546b
import DigiyoSplitCollection from 0xae3baa0d314e546b
import DigiyoAdminReceiver from 0xae3baa0d314e546b

// This transaction deposits a number of NFTs to a recipient

// Parameters
//
// recipient: the Flow address who will receive the NFTs
// instanceIDs: an array of instance IDs of NFTs that recipient will receive

transaction(recipient: Address, instanceIDs: [UInt64]) {

    let transferTokens: @NonFungibleToken.Collection
    
    prepare(acct: AuthAccount) {
        
        self.transferTokens <- acct.borrow<&DigiyoSplitCollection.SplitCollection>(from: DigiyoAdminReceiver.splitCollectionPath)!.batchWithdraw(ids: instanceIDs)
    }

    execute {

        // get the recipient's public account object
        let recipient = getAccount(recipient)

        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(Digiyo.collectionPublicPath).borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()!

        // deposit the NFT in the receivers collection
        receiverRef.batchDeposit(tokens: <-self.transferTokens)
    }
}