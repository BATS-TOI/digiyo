//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script reads the next Set ID from the Digiyo contract and 
// returns that number to the caller

// Returns: UInt32
// Value of nextSetID field in Digiyo contract

pub fun main(): UInt32 {

    log(Digiyo.nextSetID)

    return Digiyo.nextSetID
}