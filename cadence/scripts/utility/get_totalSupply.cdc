//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script reads the current number of instances that have been minted
// from the Digiyo contract and returns that number to the caller

// Returns: UInt64
// Number of instances minted from Digiyo contract

pub fun main(): UInt64 {

    return Digiyo.totalSupply
}