//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script returns a boolean indicating if the specified set is locked
// meaning new assets cannot be added to it

// Parameters:
//
// setID: The unique ID for the set whose data needs to be read

// Returns: Bool
// Whether specified set is locked

pub fun main(setID: UInt32): Bool {

    let isLocked = Digiyo.isSetLocked(setID: setID)
        ?? panic("Could not find the specified set")

    return isLocked
}