//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This transaction creates a new asset struct 
// and stores it in the Digiyo smart contract

// Parameters:
//
// metadata: A dictionary of all the asset metadata associated

transaction(metadata: {String: String}) {

    // Local variable for the digiyo Admin object
    let adminRef: &Digiyo.Admin
    let currAssetID: UInt32

    prepare(acct: AuthAccount) {

        // borrow a reference to the admin resource
        self.currAssetID = Digiyo.nextAssetID;
        self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
            ?? panic("No admin resource in storage")
    }

    execute {

        // Create a asset with the specified metadata
        self.adminRef.createAsset(metadata: metadata)
    }

    post {
        
        Digiyo.getAssetMetaData(assetID: self.currAssetID) != nil:
            "assetID doesnt exist"
    }
}