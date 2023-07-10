//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This transaction is for retiring a asset from a set, which
// makes it so that instances can no longer be minted from that edition

// Parameters:
// 
// setID: the ID of the set in which a asset is to be retired
// assetID: the ID of the asset to be retired

transaction(setID: UInt32, assetID: UInt32) {
    
    // local variable for storing the reference to the admin resource
    let adminRef: &Digiyo.Admin

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
            ?? panic("No admin resource in storage")
    }

    execute {

        // borrow a reference to the specified set
        let setRef = self.adminRef.borrowSet(setID: setID)

        // retire the asset
        setRef.retireAsset(assetID: assetID)
    }

    post {
        
        self.adminRef.borrowSet(setID: setID).retired[assetID]!: 
            "asset is not retired"
    }
}