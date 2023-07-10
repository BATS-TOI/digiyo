//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script returns the value for the specified metadata field
// associated with a asset in the Digiyo smart contract

// Parameters:
//
// assetID: The unique ID for the asset whose data needs to be read
// field: The specified metadata field whose data needs to be read

// Returns: String
// Value of specified metadata field associated with specified assetID

pub fun main(assetID: UInt32, field: String): String {

    let field = Digiyo.getAssetMetaDataByField(assetID: assetID, field: field) ?? panic("Asset doesn't exist")

    log(field)

    return field
}