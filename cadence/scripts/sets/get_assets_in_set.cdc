//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script returns an array of the asset IDs that are
// in the specified set

// Parameters:
//
// setID: The unique ID for the set whose data needs to be read

// Returns: [UInt32]
// Array of asset IDs in specified set

pub fun main(setID: UInt32): [UInt32] {

    let assets = Digiyo.getAssetsInSet(setID: setID)!

    return assets
}