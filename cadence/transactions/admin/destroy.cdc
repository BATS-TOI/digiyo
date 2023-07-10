//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

transaction() {
    prepare(acct: AuthAccount) {
        let collectionRef = acct.getCapability(Digiyo.collectionStoragePath).borrow<&Digiyo.Collection>()!
        collectionRef.destroy()
    }
}