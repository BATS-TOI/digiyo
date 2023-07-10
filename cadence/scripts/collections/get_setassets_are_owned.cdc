//SPDX-License-Identifier: MIT
import Digiyo from 0xae3baa0d314e546b

// This script checks whether for each SetID/AssetID combo, 
// they own a instance matching that SetAsset.

// Parameters:
//
// account: The Flow Address of the account whose instance data needs to be read
// setIDs: A list of unique IDs for the sets whose data needs to be read
// assetIDs: A list of unique IDs for the assets whose data needs to be read

// Returns: Bool
// Whether for each SetID/AssetID combo, 
// account owns a instance matching that SetAsset.

pub fun main(account: Address, setIDs: [UInt32], assetIDs: [UInt32]): Bool {

    assert(
        setIDs.length == assetIDs.length,
        message: "set and asset ID arrays have mismatched lengths"
    )

    let collectionRef = getAccount(account).getCapability(Digiyo.collectionPublicPath)
                .borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
                ?? panic("Could not get public instance collection reference")

    let instanceIDs = collectionRef.getIDs()

    // For each SetID/AssetID combo, loop over each instance in the account
    // to see if they own a instance matching that SetAsset.
    var i = 0

    while i < setIDs.length {
        var hasMatchingInstance = false
        for instanceID in instanceIDs {
            let token = collectionRef.borrowInstance(id: instanceID)
                ?? panic("Could not borrow a reference to the specified instance")

            let instanceData = token.data
            if instanceData.setID == setIDs[i] && instanceData.assetID == assetIDs[i] {
                hasMatchingInstance = true
                break
            }
        }
        if !hasMatchingInstance {
            return false
        }
        i = i + 1
    }
    
    return true
}