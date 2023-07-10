//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This transaction is how a Digiyo admin adds a created asset to a set

// Parameters:
//
// setID: the ID of the set to which a created asset is added
// assetID: the ID of the asset being added

transaction(setID: UInt32, assetID: UInt32) {

    // Local variable for the digiyo Admin object
    let adminRef: &Digiyo.Admin

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
            ?? panic("Could not borrow a reference to the Admin resource")
    }

    execute {
        
        // Borrow a reference to the set to be added to
        let setRef = self.adminRef.borrowSet(setID: setID)

        // Add the specified asset ID
        setRef.addAsset(assetID: assetID)
    }

    post {

        Digiyo.getAssetsInSet(setID: setID)!.contains(assetID): 
            "set does not contain assetID"
    }
}