//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script gets the metadata associated with a instance
// in a collection by looking up its assetID and then searching
// for that asset's metadata in the Digiyo contract

// Parameters:
//
// account: The Flow Address of the account whose instance data needs to be read
// id: The unique ID for the instance whose data needs to be read

// Returns: {String: String} 
// A dictionary of all the asset metadata associated
// with the specified instance

pub fun main(account: Address, id: UInt64): {String: String} {

    // get the public capability for the owner's instance collection
    // and borrow a reference to it
    let collectionRef = getAccount(account).getCapability(Digiyo.collectionPublicPath)
        .borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
        ?? panic("Could not get public instance collection reference")

    // Borrow a reference to the specified instance
    let token = collectionRef.borrowInstance(id: id)
        ?? panic("Could not borrow a reference to the specified instance")

    // Get the instance's metadata to access its asset and Set IDs
    let data = token.data

    // Use the instance's asset ID 
    // to get all the metadata associated with that asset
    let metadata = Digiyo.getAssetMetaData(assetID: data.assetID) ?? panic("Asset doesn't exist")

    log(metadata)

    return metadata
}