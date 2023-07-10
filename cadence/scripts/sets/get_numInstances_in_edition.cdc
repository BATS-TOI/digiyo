//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script returns the number of specified instances that have been
// minted for the specified edition

// Parameters:
//
// setID: The unique ID for the set whose data needs to be read
// assetID: The unique ID for the asset whose data needs to be read

// Returns: UInt32
// number of instances with specified assetID minted for a set with specified setID

pub fun main(setID: UInt32, assetID: UInt32): UInt32 {

    let numInstances = Digiyo.getNumInstancesInEdition(setID: setID, assetID: assetID)
        ?? panic("Could not find the specified edition")

    return numInstances
}