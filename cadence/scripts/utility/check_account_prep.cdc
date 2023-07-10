//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b
// What do you think this does?
pub fun main(account: Address): String {
    let acct = getAccount(account)
    var prepped: String = ""
    if acct.getCapability(Digiyo.collectionPublicPath).borrow<&{Digiyo.DigiyoNFTCollectionPublic}>() == nil {
        prepped = "false"
    } else {
        prepped = "true"
    }
    log(prepped)
    return prepped
}