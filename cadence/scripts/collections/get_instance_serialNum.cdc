//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script gets the serial number of a instance
// by borrowing a reference to the instance 
// and returning its serial number

// Parameters:
//
// account: The Flow Address of the account whose instance data needs to be read
// id: The unique ID for the instance whose data needs to be read

// Returns: UInt32
// The serialNumber associated with a instance with a specified ID

pub fun main(account: Address, id: UInt64): UInt32 {

    let collectionRef = getAccount(account).getCapability(Digiyo.collectionPublicPath)
        .borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
        ?? panic("Could not get public instance collection reference")

    let token = collectionRef.borrowInstance(id: id)
        ?? panic("Could not borrow a reference to the specified instance")

    let data = token.data

    return data.serialNumber
}