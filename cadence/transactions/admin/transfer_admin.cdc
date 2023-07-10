//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b
import DigiyoAdminReceiver from 0xae3baa0d314e546b

// this transaction takes a Digiyo Admin resource and 
// saves it to the account storage of the account
// where the contract is deployed

transaction {

    // Local variable for the digiyo Admin object
    let adminRef: @Digiyo.Admin

    prepare(acct: AuthAccount) {

        self.adminRef <- acct.load<@Digiyo.Admin>(from: Digiyo.digiyoAdminPath)
            ?? panic("No digiyo admin in storage")
    }

    execute {

        DigiyoAdminReceiver.storeAdmin(newAdmin: <-self.adminRef)
        
    }
}