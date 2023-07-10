//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This transaction locks a set so that new assets can no longer be added to it

// Parameters:
//
// setID: the ID of the set to be locked

transaction(setID: UInt32) {

    // local variable for the admin resource
    let adminRef: &Digiyo.Admin

    prepare(acct: AuthAccount) {
        // borrow a reference to the admin resource
        self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
            ?? panic("No admin resource in storage")
    }

    execute {
        // borrow a reference to the Set
        let setRef = self.adminRef.borrowSet(setID: setID)

        // lock the set permanently
        setRef.lock()
    }

    post {
        
        Digiyo.isSetLocked(setID: setID)!:
            "Set did not lock"
    }
}