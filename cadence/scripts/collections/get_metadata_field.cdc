//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script gets the metadata associated with a instance
// in a collection by looking up its assetID and then searching
// for that asset's metadata in the Digiyo contract. It returns
// the value for the specified metadata field

// Parameters:
//
// account: The Flow Address of the account whose instance data needs to be read
// instanceID: The unique ID for the instance whose data needs to be read
// fieldToSearch: The specified metadata field whose data needs to be read

// Returns: String
// Value of specified metadata field

pub fun main(account: Address, instanceID: UInt64, fieldToSearch: String): String {

    // borrow a public reference to the owner's instance collection 
    let collectionRef = getAccount(account).getCapability(Digiyo.collectionPublicPath)
        .borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
        ?? panic("Could not get public instance collection reference")

    // borrow a reference to the specified instance in the collection
    let token = collectionRef.borrowInstance(id: id)
        ?? panic("Could not borrow a reference to the specified instance")

    // Get the tokens data
    let data = token.data

    // Get the metadata field associated with the specific asset
    let field = Digiyo.getAssetMetaDataByField(assetID: data.assetID, field: fieldToSearch) ?? panic("Asset doesn't exist")

    log(field)

    return field
}