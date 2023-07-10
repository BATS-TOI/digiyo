//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This is a transaction an admin would use to retire all the assets in a set
// which makes it so that no more instances can be minted from the retired assets

// Parameters:
//
// setID: the ID of the set to be retired entirely

transaction(setID: UInt32) {

    // local variable for the admin reference
    let adminRef: &Digiyo.Admin

    prepare(acct: AuthAccount) {

        // borrow a reference to the admin resource
        self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
            ?? panic("No admin resource in storage")
    }

    execute {

        // borrow a reference to the specified set
        let setRef = self.adminRef.borrowSet(setID: setID)

        // retire all the assets permenantely
        setRef.retireAll()
    }
}