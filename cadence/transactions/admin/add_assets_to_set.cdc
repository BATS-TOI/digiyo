//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This transaction adds multiple assets to a set
		
// Parameters:
//
// setID: the ID of the set to which multiple assets are added
// assets: an array of asset IDs being added to the set

transaction(setID: UInt32, assets: [UInt32]) {

    // Local variable for the digiyo Admin object
    let adminRef: &Digiyo.Admin

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)!
    }

    execute {

        // borrow a reference to the set to be added to
        let setRef = self.adminRef.borrowSet(setID: setID)

        // Add the specified asset IDs
        setRef.addAssets(assetIDs: assets)
    }
}