//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script returns true if a instance with the specified ID
// exists in a user's collection

// Parameters:
//
// account: The Flow Address of the account whose instance data needs to be read
// id: The unique ID for the instance whose data needs to be read

// Returns: Bool
// Whether a instance with specified ID exists in user's collection

pub fun main(account: Address, id: UInt64): Bool {

    let collectionRef = getAccount(account).getCapability(Digiyo.collectionPublicPath)
        .borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
        ?? panic("Could not get public instance collection reference")

    return collectionRef.borrowNFT(id: id) != nil
}