//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This transaction reads if a specified edition is retired

// Parameters:
//
// setID: The unique ID for the set whose data needs to be read
// assetID: The unique ID for the asset whose data needs to be read

// Returns: Bool
// Whether specified set is retired

pub fun main(setID: UInt32, assetID: UInt32): Bool {

    let isRetired = Digiyo.isEditionRetired(setID: setID, assetID: assetID)
        ?? panic("Could not find the specified edition")
    
    return isRetired
}