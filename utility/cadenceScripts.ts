export async function cadenceScripts (req: string) {

    if (req == "user/check_account") {
        return `//SPDX-License-Identifier: MIT
                    import Digiyo from 0xae3baa0d314e546b
                    pub fun main(account: Address): String {
                        let acct = getAccount(account)
                        var prepped: String = ""
                        if acct.getCapability(Digiyo.collectionPublicPath).borrow<&{Digiyo.DigiyoNFTCollectionPublic}>() == nil {
                            prepped = "false"
                        } else {
                            prepped = "true"
                        }
                        log(prepped)
                        return prepped
                    }`;
    } else if (req == "user/setup_account") {
        return `//SPDX-License-Identifier: MIT
                    import Digiyo from 0xae3baa0d314e546b
                    import MetadataViews from 0x1d7e57aa55817448
                    transaction {
                        prepare(acct: AuthAccount) {
                            if acct.borrow<&Digiyo.Collection>(from: Digiyo.collectionStoragePath) == nil {
                                let collection <- Digiyo.createEmptyCollection() as! @Digiyo.Collection
                                acct.save(<-collection, to: Digiyo.collectionStoragePath)
                                acct.link<&{Digiyo.DigiyoNFTCollectionPublic, MetadataViews.ResolverCollection}>(Digiyo.collectionPublicPath, target: Digiyo.collectionStoragePath)
                            }
                        }
                    }`;
    } else if (req == "user/get_collection_ids") {
        return `//SPDX-License-Identifier: MIT
                    import Digiyo from 0xae3baa0d314e546b
                    pub fun main(account: Address): [UInt64] {
                        let acct = getAccount(account)
                        let collectionRef = acct.getCapability(Digiyo.collectionPublicPath).borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()!
                        log(collectionRef.getIDs())
                        return collectionRef.getIDs()
                    }`;
    } else if (req == "user/get_metadata") {
        return `//SPDX-License-Identifier: MIT
                    import Digiyo from 0xae3baa0d314e546b
                    pub fun main(account: Address, id: UInt64): {String: String} {
                        let collectionRef = getAccount(account).getCapability(Digiyo.collectionPublicPath)
                            .borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
                            ?? panic("Could not get public instance collection reference")
                        let token = collectionRef.borrowInstance(id: id)
                            ?? panic("Could not borrow a reference to the specified instance")
                        let data = token.data
                        let metadata = Digiyo.getAssetMetaData(assetID: data.assetID) ?? panic("Asset doesn't exist")
                        log(metadata)
                        return metadata
                    }`;
    } else if (req == "storefront/check_account") {
        return `//SPDX-License-Identifier: MIT
                    import NFTStorefront from 0x4eb8a10cb9f87357
                    pub fun main(account: Address): String {
                        let acct = getAccount(account)
                        var prepped: String = ""
                        if acct.getCapability(NFTStorefront.StorefrontPublicPath).borrow<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>() == nil {
                            prepped = "false"
                        } else {
                            prepped = "true"
                        }
                        log(prepped)
                        return prepped
                    }`;
    } else if (req == "storefront/setup_account") {
        return `import NFTStorefront from 0x4eb8a10cb9f87357
                    transaction {
                        prepare(acct: AuthAccount) {
                            if acct.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath) == nil {
                                let storefront <- NFTStorefront.createStorefront() as! @NFTStorefront.Storefront
                                acct.save(<-storefront, to: NFTStorefront.StorefrontStoragePath)
                                acct.link<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath, target: NFTStorefront.StorefrontStoragePath)
                            }
                        }
                    }`;
    } else if (req == "storefront/sell_item") {
        return `import FungibleToken from 0xf233dcee88fe0abe
                    import NonFungibleToken from 0x1d7e57aa55817448
                    import FlowToken from 0x1654653399040a61
                    import Digiyo from 0xae3baa0d314e546b
                    import NFTStorefront from 0x4eb8a10cb9f87357
                    transaction(saleItemID: UInt64, saleItemPrice: UFix64, digiYoAddr: Address, artistAddr: Address, musicAddr: Address, athleteAddr: Address) {
                        let flowReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
                        let digiYoReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
                        let artistReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
                        let musicReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
                        let athleteReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
                        let digiyoProvider: Capability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
                        let storefront: &NFTStorefront.Storefront
                        prepare(acct: AuthAccount) {
                            let flowTokenReceiverPath = /public/flowTokenReceiver
                            let digiyoCollectionProviderPrivatePath = /private/digiyoCollectionProviderForNFTStorefront
                            self.flowReceiver = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
                            assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")
                            self.digiYoReceiver = getAccount(digiYoAddr).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
                            assert(self.digiYoReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")
                            self.artistReceiver = getAccount(artistAddr).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
                            assert(self.artistReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")
                            self.musicReceiver = getAccount(musicAddr).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
                            assert(self.musicReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")
                            self.athleteReceiver = getAccount(athleteAddr).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
                            assert(self.athleteReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")
                            if !acct.getCapability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath)!.check() {
                                acct.link<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath, target: Digiyo.collectionStoragePath)
                            }
                            self.digiyoProvider = acct.getCapability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath)!
                            assert(self.digiyoProvider.borrow() != nil, message: "Missing or mis-typed Digiyo.Collection provider")
                            self.storefront = acct.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath)
                                ?? panic("Missing or mis-typed NFTStorefront Storefront")
                        }
                        execute {
                            let saleCutSeller = NFTStorefront.SaleCut(receiver: self.flowReceiver, amount: saleItemPrice - 0.1*saleItemPrice)
                            let saleCutDigiyo = NFTStorefront.SaleCut(receiver: self.digiYoReceiver, amount: saleItemPrice*0.025)
                            let saleCutArtist = NFTStorefront.SaleCut(receiver: self.artistReceiver, amount: saleItemPrice*0.025)
                            let saleCutMusician = NFTStorefront.SaleCut(receiver: self.musicReceiver, amount: saleItemPrice*0.025)
                            let saleCutAthlete = NFTStorefront.SaleCut(receiver: self.athleteReceiver, amount: saleItemPrice*0.025)
                            self.storefront.createListing(
                                nftProviderCapability: self.digiyoProvider,
                                nftType: Type<@Digiyo.NFT>(),
                                nftID: saleItemID,
                                salePaymentVaultType: Type<@FlowToken.Vault>(),
                                saleCuts: [saleCutSeller, saleCutDigiyo, saleCutArtist, saleCutMusician, saleCutAthlete]
                            )
                        }
                    }`;
    } else if (req == "storefront/sell_items") {
        return `import FungibleToken from 0xf233dcee88fe0abe
        import NonFungibleToken from 0x1d7e57aa55817448
        import FlowToken from 0x1654653399040a61
        import Digiyo from 0xae3baa0d314e546b
        import NFTStorefront from 0x4eb8a10cb9f87357
        transaction(saleItemIDs: [UInt64], saleItemPrice: UFix64, digiYoAddr: Address, artistAddr: Address, musicAddr: Address, athleteAddr: Address) {
            let flowReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
            let digiYoReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
            let artistReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
            let musicReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
            let athleteReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
            let digiyoProvider: Capability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
            let storefront: &NFTStorefront.Storefront
            prepare(acct: AuthAccount) {
                let flowTokenReceiverPath = /public/flowTokenReceiver
                let digiyoCollectionProviderPrivatePath = /private/digiyoCollectionProviderForNFTStorefront
                self.flowReceiver = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
                assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")
                self.digiYoReceiver = getAccount(digiYoAddr).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
                assert(self.digiYoReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")
                self.artistReceiver = getAccount(artistAddr).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
                assert(self.artistReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")
                self.musicReceiver = getAccount(musicAddr).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
                assert(self.musicReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")
                self.athleteReceiver = getAccount(athleteAddr).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
                assert(self.athleteReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")
                if !acct.getCapability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath)!.check() {
                    acct.link<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath, target: Digiyo.collectionStoragePath)
                }
                self.digiyoProvider = acct.getCapability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath)!
                assert(self.digiyoProvider.borrow() != nil, message: "Missing or mis-typed Digiyo.Collection provider")
                self.storefront = acct.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath)
                    ?? panic("Missing or mis-typed NFTStorefront Storefront")
            }
            execute {
                let saleCutSeller = NFTStorefront.SaleCut(receiver: self.flowReceiver, amount: saleItemPrice - 0.1*saleItemPrice)
                let saleCutDigiyo = NFTStorefront.SaleCut(receiver: self.digiYoReceiver, amount: saleItemPrice*0.025)
                let saleCutArtist = NFTStorefront.SaleCut(receiver: self.artistReceiver, amount: saleItemPrice*0.025)
                let saleCutMusician = NFTStorefront.SaleCut(receiver: self.musicReceiver, amount: saleItemPrice*0.025)
                let saleCutAthlete = NFTStorefront.SaleCut(receiver: self.athleteReceiver, amount: saleItemPrice*0.025)
                for saleItemID in saleItemIDs {
                    self.storefront.createListing(
                        nftProviderCapability: self.digiyoProvider,
                        nftType: Type<@Digiyo.NFT>(),
                        nftID: saleItemID,
                        salePaymentVaultType: Type<@FlowToken.Vault>(),
                        saleCuts: [saleCutSeller, saleCutDigiyo, saleCutArtist, saleCutMusician, saleCutAthlete]
                    )
                }
                
            }
        }`;
    } else if (req == "storefront/sell_item_fusd") {
        return `import FungibleToken from 0xf233dcee88fe0abe
                    import NonFungibleToken from 0x1d7e57aa55817448
                    import FUSD from 0x3c5959b568896393
                    import Digiyo from 0xae3baa0d314e546b
                    import NFTStorefront from 0x4eb8a10cb9f87357
                    transaction(saleItemID: UInt64, saleItemPrice: UFix64, digiYoAddr: Address, artistAddr: Address, musicAddr: Address, athleteAddr: Address) {
                        let flowReceiver: Capability<&FUSD.Vault{FungibleToken.Receiver}>
                        let digiYoReceiver: Capability<&FUSD.Vault{FungibleToken.Receiver}>
                        let artistReceiver: Capability<&FUSD.Vault{FungibleToken.Receiver}>
                        let musicReceiver: Capability<&FUSD.Vault{FungibleToken.Receiver}>
                        let athleteReceiver: Capability<&FUSD.Vault{FungibleToken.Receiver}>
                        let digiyoProvider: Capability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
                        let storefront: &NFTStorefront.Storefront
                        prepare(acct: AuthAccount) {
                            let fusdReceiverPath = /public/fusdReceiver
                            let digiyoCollectionProviderPrivatePath = /private/digiyoCollectionProviderForNFTStorefront
                            self.flowReceiver = acct.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(fusdReceiverPath)!
                            assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FUSD receiver")
                            self.digiYoReceiver = getAccount(digiYoAddr).getCapability<&FUSD.Vault{FungibleToken.Receiver}>(fusdReceiverPath)!
                            assert(self.digiYoReceiver.borrow() != nil, message: "Missing or mis-typed FUSD receiver")
                            self.artistReceiver = getAccount(artistAddr).getCapability<&FUSD.Vault{FungibleToken.Receiver}>(fusdReceiverPath)!
                            assert(self.artistReceiver.borrow() != nil, message: "Missing or mis-typed FUSD receiver")
                            self.musicReceiver = getAccount(musicAddr).getCapability<&FUSD.Vault{FungibleToken.Receiver}>(fusdReceiverPath)!
                            assert(self.musicReceiver.borrow() != nil, message: "Missing or mis-typed FUSD receiver")
                            self.athleteReceiver = getAccount(athleteAddr).getCapability<&FUSD.Vault{FungibleToken.Receiver}>(fusdReceiverPath)!
                            assert(self.athleteReceiver.borrow() != nil, message: "Missing or mis-typed FUSD receiver")
                            if !acct.getCapability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath)!.check() {
                                acct.link<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath, target: Digiyo.collectionStoragePath)
                            }
                            self.digiyoProvider = acct.getCapability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath)!
                            assert(self.digiyoProvider.borrow() != nil, message: "Missing or mis-typed Digiyo.Collection provider")
                            self.storefront = acct.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath)
                                ?? panic("Missing or mis-typed NFTStorefront Storefront")
                        }
                        execute {
                            let saleCutSeller = NFTStorefront.SaleCut(receiver: self.flowReceiver, amount: saleItemPrice - 0.1*saleItemPrice)
                            let saleCutDigiyo = NFTStorefront.SaleCut(receiver: self.digiYoReceiver, amount: saleItemPrice*0.025)
                            let saleCutArtist = NFTStorefront.SaleCut(receiver: self.artistReceiver, amount: saleItemPrice*0.025)
                            let saleCutMusician = NFTStorefront.SaleCut(receiver: self.musicReceiver, amount: saleItemPrice*0.025)
                            let saleCutAthlete = NFTStorefront.SaleCut(receiver: self.athleteReceiver, amount: saleItemPrice*0.025)
                            self.storefront.createListing(
                                nftProviderCapability: self.digiyoProvider,
                                nftType: Type<@Digiyo.NFT>(),
                                nftID: saleItemID,
                                salePaymentVaultType: Type<@FUSD.Vault>(),
                                saleCuts: [saleCutSeller, saleCutDigiyo, saleCutArtist, saleCutMusician, saleCutAthlete]
                            )
                        }
                    }`;
    } else if (req == "storefront/sell_items_fusd") {
        return `import FungibleToken from 0xf233dcee88fe0abe
        import NonFungibleToken from 0x1d7e57aa55817448
        import FUSD from 0x3c5959b568896393
        import Digiyo from 0xae3baa0d314e546b
        import NFTStorefront from 0x4eb8a10cb9f87357
        transaction(saleItemIDs: [UInt64], saleItemPrice: UFix64, digiYoAddr: Address, artistAddr: Address, musicAddr: Address, athleteAddr: Address) {
            let flowReceiver: Capability<&FUSD.Vault{FungibleToken.Receiver}>
            let digiYoReceiver: Capability<&FUSD.Vault{FungibleToken.Receiver}>
            let artistReceiver: Capability<&FUSD.Vault{FungibleToken.Receiver}>
            let musicReceiver: Capability<&FUSD.Vault{FungibleToken.Receiver}>
            let athleteReceiver: Capability<&FUSD.Vault{FungibleToken.Receiver}>
            let digiyoProvider: Capability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
            let storefront: &NFTStorefront.Storefront
            prepare(acct: AuthAccount) {
                let fusdReceiverPath = /public/fusdReceiver
                let digiyoCollectionProviderPrivatePath = /private/digiyoCollectionProviderForNFTStorefront
                self.flowReceiver = acct.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(fusdReceiverPath)!
                assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FUSD receiver")
                self.digiYoReceiver = getAccount(digiYoAddr).getCapability<&FUSD.Vault{FungibleToken.Receiver}>(fusdReceiverPath)!
                assert(self.digiYoReceiver.borrow() != nil, message: "Missing or mis-typed FUSD receiver")
                self.artistReceiver = getAccount(artistAddr).getCapability<&FUSD.Vault{FungibleToken.Receiver}>(fusdReceiverPath)!
                assert(self.artistReceiver.borrow() != nil, message: "Missing or mis-typed FUSD receiver")
                self.musicReceiver = getAccount(musicAddr).getCapability<&FUSD.Vault{FungibleToken.Receiver}>(fusdReceiverPath)!
                assert(self.musicReceiver.borrow() != nil, message: "Missing or mis-typed FUSD receiver")
                self.athleteReceiver = getAccount(athleteAddr).getCapability<&FUSD.Vault{FungibleToken.Receiver}>(fusdReceiverPath)!
                assert(self.athleteReceiver.borrow() != nil, message: "Missing or mis-typed FUSD receiver")
                if !acct.getCapability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath)!.check() {
                    acct.link<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath, target: Digiyo.collectionStoragePath)
                }
                self.digiyoProvider = acct.getCapability<&Digiyo.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(digiyoCollectionProviderPrivatePath)!
                assert(self.digiyoProvider.borrow() != nil, message: "Missing or mis-typed Digiyo.Collection provider")
                self.storefront = acct.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath)
                    ?? panic("Missing or mis-typed NFTStorefront Storefront")
            }
            execute {
                let saleCutSeller = NFTStorefront.SaleCut(receiver: self.flowReceiver, amount: saleItemPrice - 0.1*saleItemPrice)
                let saleCutDigiyo = NFTStorefront.SaleCut(receiver: self.digiYoReceiver, amount: saleItemPrice*0.025)
                let saleCutArtist = NFTStorefront.SaleCut(receiver: self.artistReceiver, amount: saleItemPrice*0.025)
                let saleCutMusician = NFTStorefront.SaleCut(receiver: self.musicReceiver, amount: saleItemPrice*0.025)
                let saleCutAthlete = NFTStorefront.SaleCut(receiver: self.athleteReceiver, amount: saleItemPrice*0.025)
                for saleItemID in saleItemIDs {
                    self.storefront.createListing(
                        nftProviderCapability: self.digiyoProvider,
                        nftType: Type<@Digiyo.NFT>(),
                        nftID: saleItemID,
                        salePaymentVaultType: Type<@FUSD.Vault>(),
                        saleCuts: [saleCutSeller, saleCutDigiyo, saleCutArtist, saleCutMusician, saleCutAthlete]
                    )
                }
            }
        }`;
    } else if (req == "storefront/buy_item") {
        return `import FungibleToken from 0xf233dcee88fe0abe
                    import NonFungibleToken from 0x1d7e57aa55817448
                    import FlowToken from 0x1654653399040a61
                    import Digiyo from 0xae3baa0d314e546b
                    import NFTStorefront from 0x4eb8a10cb9f87357
                    transaction(listingResourceID: UInt64, storefrontAddress: Address) {
                        let paymentVault: @FungibleToken.Vault
                        let digiyoCollection: &Digiyo.Collection{NonFungibleToken.Receiver}
                        let storefront: &NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}
                        let listing: &NFTStorefront.Listing{NFTStorefront.ListingPublic}
                        prepare(acct: AuthAccount) {
                            self.storefront = getAccount(storefrontAddress)
                                .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(
                                    NFTStorefront.StorefrontPublicPath
                                )!
                                .borrow()
                                ?? panic("Could not borrow Storefront from provided address")
                            self.listing = self.storefront.borrowListing(listingResourceID: listingResourceID)
                                        ?? panic("No Offer with that ID in Storefront")
                            let price = self.listing.getDetails().salePrice
                            let mainFlowVault = acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
                                ?? panic("Cannot borrow FlowToken vault from acct storage")
                            self.paymentVault <- mainFlowVault.withdraw(amount: price)
                            self.digiyoCollection = acct.borrow<&Digiyo.Collection{NonFungibleToken.Receiver}>(
                                from: Digiyo.collectionStoragePath
                            ) ?? panic("Cannot borrow NFT collection receiver from account")
                        }
                        execute {
                            let item <- self.listing.purchase(payment: <-self.paymentVault)
                            self.digiyoCollection.deposit(token: <-item)
                            self.storefront.cleanup(listingResourceID: listingResourceID)
                        }
                    }`;
    } else if (req == "storefront/buy_item_fusd") {
        return `import FungibleToken from 0xf233dcee88fe0abe
                    import NonFungibleToken from 0x1d7e57aa55817448
                    import FUSD from 0x3c5959b568896393
                    import Digiyo from 0xae3baa0d314e546b
                    import NFTStorefront from 0x4eb8a10cb9f87357
                    transaction(listingResourceID: UInt64, storefrontAddress: Address) {
                        let paymentVault: @FungibleToken.Vault
                        let digiyoCollection: &Digiyo.Collection{NonFungibleToken.Receiver}
                        let storefront: &NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}
                        let listing: &NFTStorefront.Listing{NFTStorefront.ListingPublic}
                        prepare(acct: AuthAccount) {
                            self.storefront = getAccount(storefrontAddress)
                                .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(
                                    NFTStorefront.StorefrontPublicPath
                                )!
                                .borrow()
                                ?? panic("Could not borrow Storefront from provided address")
                            self.listing = self.storefront.borrowListing(listingResourceID: listingResourceID)
                                        ?? panic("No Offer with that ID in Storefront")
                            let price = self.listing.getDetails().salePrice
                            let mainFlowVault = acct.borrow<&FUSD.Vault>(from: /storage/fusdVault)
                                ?? panic("Cannot borrow FUSD vault from acct storage")
                            self.paymentVault <- mainFlowVault.withdraw(amount: price)
                            self.digiyoCollection = acct.borrow<&Digiyo.Collection{NonFungibleToken.Receiver}>(
                                from: Digiyo.collectionStoragePath
                            ) ?? panic("Cannot borrow NFT collection receiver from account")
                        }
                        execute {
                            let item <- self.listing.purchase(payment: <-self.paymentVault)
                            self.digiyoCollection.deposit(token: <-item)
                            self.storefront.cleanup(listingResourceID: listingResourceID)
                        }
                    }`;
    } else if (req == "storefront/remove_item") {
        return `import NFTStorefront from 0x4eb8a10cb9f87357
        transaction(listingResourceID: UInt64) {
            let storefront: &NFTStorefront.Storefront{NFTStorefront.StorefrontManager}
            prepare(acct: AuthAccount) {
                self.storefront = acct.borrow<&NFTStorefront.Storefront{NFTStorefront.StorefrontManager}>(from: NFTStorefront.StorefrontStoragePath)
                    ?? panic("Missing or mis-typed NFTStorefront.Storefront")
            }
            execute {
                self.storefront.removeListing(listingResourceID: listingResourceID)
            }
        }`;
    } else if (req == "user/batch_transfer") {
        return `//SPDX-License-Identifier: MIT
        import NonFungibleToken from 0x1d7e57aa55817448
        import Digiyo from 0xae3baa0d314e546b
        transaction(recipientAddress: Address, instanceIDs: [UInt64]) {
            let transferTokens: @NonFungibleToken.Collection
            prepare(acct: AuthAccount) {
                self.transferTokens <- acct.borrow<&Digiyo.Collection>(from: Digiyo.collectionStoragePath)!.batchWithdraw(ids: instanceIDs)
            }
            execute {
                let recipient = getAccount(recipientAddress)
                let receiverRef = recipient.getCapability(Digiyo.collectionPublicPath).borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
                    ?? panic("Could not borrow a reference to the recipients instance receiver")
                receiverRef.batchDeposit(tokens: <-self.transferTokens)
            }
        }`;
    } else if (req == "storefront/read_storefront_ids") {
        return `import NFTStorefront from 0x4eb8a10cb9f87357
        pub fun main(account: Address): [UInt64] {
            let storefrontRef = getAccount(account)
                .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(
                    NFTStorefront.StorefrontPublicPath
                )
                .borrow()
                ?? panic("Could not borrow public storefront from address")
            return storefrontRef.getListingIDs()
        }`
    } else if (req == "storefront/read_listing_details") {
        return `import NFTStorefront from 0x4eb8a10cb9f87357
        pub fun main(account: Address, listingResourceID: UInt64): NFTStorefront.ListingDetails {
            let storefrontRef = getAccount(account)
                .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(
                    NFTStorefront.StorefrontPublicPath
                )
                .borrow()
                ?? panic("Could not borrow public storefront from address")
            let listing = storefrontRef.borrowListing(listingResourceID: listingResourceID)
                ?? panic("No item with that ID")
            return listing.getDetails()
        }`
    } else {
        return ``
    }
}