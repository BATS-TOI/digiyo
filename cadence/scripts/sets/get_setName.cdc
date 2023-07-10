//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script gets the setName of a set with specified setID

// Parameters:
//
// setID: The unique ID for the set whose data needs to be read

// Returns: String
// Name of set with specified setID

pub fun main(setID: UInt32): String {

    let name = Digiyo.getSetName(setID: setID)
        ?? panic("Could not find the specified set")
        
    return name
}