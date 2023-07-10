//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script reads the public nextAssetID from the Digiyo contract and 
// returns that number to the caller

// Returns: UInt32
// the nextAssetID field in Digiyo contract

pub fun main(): UInt32 {

    log(Digiyo.nextAssetID)

    return Digiyo.nextAssetID
}