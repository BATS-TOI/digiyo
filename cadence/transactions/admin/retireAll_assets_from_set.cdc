//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This transaction is for retiring all assets from a set, which
// makes it so that instances can no longer be minted
// from all the editions with that set

// Parameters:
//
// setID: the ID of the set to be retired entirely

transaction(setID: UInt32) {
    let adminRef: &Digiyo.Admin

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
            ?? panic("No admin resource in storage")
    }

    execute {
        // borrow a reference to the specified set
        let setRef = self.adminRef.borrowSet(setID: setID)

        // retire all the assets
        setRef.retireAll()
    }
}