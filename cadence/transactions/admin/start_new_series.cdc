//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This transaction is for an Admin to start a new Digiyo series

transaction {

    // Local variable for the digiyo Admin object
    let adminRef: &Digiyo.Admin
    let currentSeries: UInt32

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
            ?? panic("No admin resource in storage")

        self.currentSeries = Digiyo.currentSeries
    }

    execute {
        
        // Increment the series number
        self.adminRef.startNewSeries()
    }

    post {
    
        Digiyo.currentSeries == self.currentSeries + 1 as UInt32:
            "new series not started"
    }
}
 