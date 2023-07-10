//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b
import MetadataViews from 0x1d7e57aa55817448

// This transaction sets up an account to use Digiyo
// by storing an empty instance collection and creating
// a public capability for it

transaction {

    prepare(acct: AuthAccount) {

        // First, check to see if a instance collection already exists
        if acct.borrow<&Digiyo.Collection>(from: Digiyo.collectionStoragePath) == nil {

            // create a new Digiyo Collection
            let collection <- Digiyo.createEmptyCollection() as! @Digiyo.Collection

            // Put the new Collection in storage
            acct.save(<-collection, to: Digiyo.collectionStoragePath)

            // create a public capability for the collection
            acct.link<&{Digiyo.DigiyoNFTCollectionPublic, MetadataViews.ResolverCollection}>(Digiyo.collectionPublicPath, target: Digiyo.collectionStoragePath)
        }
    }
}