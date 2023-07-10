# This directory contains all custom contracts (i.e. the core of the digiYo Dapp)
## Digiyo.cdc:
- Primary Smart-Contract. Contains the code for defining and minting NFTs as well as the necessary interfaces for defining,  storing, and transferring said NFTs.
## DigiyoAdminReceiver.cdc:
- Provides admin capabilities to the holder. Needed for defining, minting, and generally facilitating back-end operations of our Dapp.
## DigiyoSplitCollection.cdc:
- Required for very large batch minting and storing.
## Market.cdc:
- Initial implementaion of secondary market (peer-to-peer) contracts. Soon to be deprecated in favor of NFTStoreFront.cdc (see utility contracts).
## MarketV2.cdc:
- Upgraded version of inital Market.cdc contract. Inherits therefrom.  Soon to be deprecated in favor of NFTStoreFront.cdc (see utility contracts).