//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script returns the full metadata associated with a asset
// in the Digiyo smart contract

// Parameters:
//
// assetID: The unique ID for the asset whose data needs to be read

// Returns: {String:String}
// A dictionary of all the asset metadata associated
// with the specified assetID

pub fun main(assetID: UInt32): {String:String} {

    let metadata = Digiyo.getAssetMetaData(assetID: assetID) ?? panic("Asset doesn't exist")

    log(metadata)

    return metadata
}