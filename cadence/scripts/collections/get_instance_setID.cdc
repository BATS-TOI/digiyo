//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script gets the setID associated with a instance
// in a collection by getting a reference to the instance
// and then looking up its setID 

// Parameters:
//
// account: The Flow Address of the account whose instance data needs to be read
// id: The unique ID for the instance whose data needs to be read

// Returns: UInt32
// The setID associated with a instance with a specified ID

pub fun main(account: Address, id: UInt64): UInt32 {

    // borrow a public reference to the owner's instance collection 
    let collectionRef = getAccount(account).getCapability(Digiyo.collectionPublicPath)
        .borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
        ?? panic("Could not get public instance collection reference")

    // borrow a reference to the specified instance in the collection
    let token = collectionRef.borrowInstance(id: id)
        ?? panic("Could not borrow a reference to the specified instance")

    let data = token.data

    return data.setID
}