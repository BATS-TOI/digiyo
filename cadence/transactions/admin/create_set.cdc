//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This transaction is for the admin to create a new set resource
// and store it in the digiyo smart contract

// Parameters:
//
// setName: the name of a new Set to be created

transaction(setName: String) {
    
    // Local variable for the digiyo Admin object
    let adminRef: &Digiyo.Admin
    let currSetID: UInt32

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
            ?? panic("Could not borrow a reference to the Admin resource")
        self.currSetID = Digiyo.nextSetID;
    }

    execute {
        
        // Create a set with the specified name
        self.adminRef.createSet(name: setName)
    }

    post {
        
        Digiyo.getSetName(setID: self.currSetID) == setName:
          "Could not find the specified set"
    }
}