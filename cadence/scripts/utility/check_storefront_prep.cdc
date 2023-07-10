//SPDX-License-Identifier: MIT
import NFTStorefront from 0x4eb8a10cb9f87357
// What do you think this does?
pub fun main(account: Address): String {
    let acct = getAccount(account)
    var prepped: String = ""
    if acct.getCapability(NFTStorefront.StorefrontPublicPath).borrow<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>() == nil {
        prepped = "false"
    } else {
        prepped = "true"
    }
    log(prepped)
    return prepped
}