//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script reads the series of the specified set and returns it

// Parameters:
//
// setID: The unique ID for the set whose data needs to be read

// Returns: UInt32
// unique ID of series

pub fun main(setID: UInt32): UInt32 {

    let series = Digiyo.getSetSeries(setID: setID)
        ?? panic("Could not find the specified set")

    return series
}