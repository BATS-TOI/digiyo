//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This is the script to get a list of all the instances' ids an account owns
// Just update the argument to `getAccount` to whatever account you want
// and as long as they have a published Collection receiver, you can see
// the instances they own.

// Parameters:
//
// account: The Flow Address of the account whose instance data needs to be read

// Returns: [UInt64]
// list of all instances' ids an account owns

pub fun main(account: Address): [UInt64] {

    let acct = getAccount(account)

    let collectionRef = acct.getCapability(Digiyo.collectionPublicPath)
                            .borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()!

    log(collectionRef.getIDs())

    return collectionRef.getIDs()
}