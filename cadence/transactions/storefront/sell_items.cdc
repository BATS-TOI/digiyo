import FungibleToken from 0xf233dcee88fe0abe
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
        // We need a provider capability, but one is not provided by default so we create one if needed.
        let digiyoCollectionProviderPrivatePath = /private/digiyoCollectionProviderForNFTStorefront

        //self.flowTokenReceiverPath = /public/flowTokenReceiver

        //Prepare seller
        self.flowReceiver = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
        assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")

        //Prepare digiYo
        self.digiYoReceiver = getAccount(digiYoAddr).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
        assert(self.digiYoReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")

        //Prepare artist
        self.artistReceiver = getAccount(artistAddr).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
        assert(self.artistReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")

        //Prepare musician
        self.musicReceiver = getAccount(musicAddr).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(flowTokenReceiverPath)!
        assert(self.musicReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")

        //Prepare athlete
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
        let saleCutSeller = NFTStorefront.SaleCut(
            receiver: self.flowReceiver,
            amount: saleItemPrice - 0.1*saleItemPrice
        )

        let saleCutDigiyo = NFTStorefront.SaleCut(
            receiver: self.digiYoReceiver,
            amount: saleItemPrice*0.025
        )

        let saleCutArtist = NFTStorefront.SaleCut(
            receiver: self.artistReceiver,
            amount: saleItemPrice*0.025
        )

        let saleCutMusician = NFTStorefront.SaleCut(
            receiver: self.musicReceiver,
            amount: saleItemPrice*0.025
        )

        let saleCutAthlete = NFTStorefront.SaleCut(
            receiver: self.athleteReceiver,
            amount: saleItemPrice*0.025
        )
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
}
