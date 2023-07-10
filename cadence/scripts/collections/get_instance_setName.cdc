//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script gets the set name associated with a instance
// in a collection by getting a reference to the instance
// and then looking up its name

// Parameters:
//
// account: The Flow Address of the account whose instance data needs to be read
// id: The unique ID for the instance whose data needs to be read

// Returns: String
// The set name associated with a instance with a specified ID

pub fun main(account: Address, id: UInt64): String {

    // borrow a public reference to the owner's instance collection 
    let collectionRef = getAccount(account).getCapability(Digiyo.collectionPublicPath)
        .borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
        ?? panic("Could not get public instance collection reference")

    // borrow a reference to the specified instance in the collection
    let token = collectionRef.borrowInstance(id: id)
        ?? panic("Could not borrow a reference to the specified instance")

    let data = token.data

    return Digiyo.getSetName(setID: data.setID)!
}