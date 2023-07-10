//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script reads the current series from the Digiyo contract and 
// returns that number to the caller

// Returns: UInt32
// currentSeries field in Digiyo contract

pub fun main(): UInt32 {

    return Digiyo.currentSeries
}