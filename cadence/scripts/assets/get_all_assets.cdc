//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script returns an array of all the assets 
// that have ever been created for Digiyo

// Returns: [Digiyo.Asset]
// array of all assets created for Digiyo

pub fun main(): [Digiyo.Asset] {

    return Digiyo.getAllAssets()
}