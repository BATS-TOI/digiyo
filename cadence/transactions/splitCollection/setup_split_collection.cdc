//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b
import DigiyoSplitCollection from 0xae3baa0d314e546b
import DigiyoAdminReceiver from 0xae3baa0d314e546b

// This transaction creates and stores an empty instance collection 
// and creates a public capability for it.
// Instances are split into a number of buckets
// This makes storage more efficient and performant

// Parameters
//
// numBuckets: The number of buckets to split Instances into

transaction(numBuckets: UInt64) {

    prepare(acct: AuthAccount) {

        if acct.borrow<&DigiyoSplitCollection.SplitCollection>(from: DigiyoAdminReceiver.splitCollectionPath) == nil {

            let collection <- DigiyoSplitCollection.createEmptyCollection(numBuckets: numBuckets)
            // Put a new Collection in storage
            acct.save(<-collection, to: DigiyoAdminReceiver.splitCollectionPath)

            // create a public capability for the collection
            if acct.link<&{Digiyo.DigiyoNFTCollectionPublic}>(Digiyo.collectionPublicPath, target: DigiyoAdminReceiver.splitCollectionPath) == nil {
                acct.unlink(Digiyo.collectionPublicPath)
            }

            acct.link<&{Digiyo.DigiyoNFTCollectionPublic}>(Digiyo.collectionPublicPath, target: DigiyoAdminReceiver.splitCollectionPath)
        } else {

            panic("Split Collection already exists!")
        }
    }
}