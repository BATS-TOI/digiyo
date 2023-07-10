# This directory contains all cadence code currently utilized by the digiYo Dapp.
## Contracts:
### Contain both custom and utility contracts:
- Custom contracts are the backbone of our Dapp.
    - These implement all necessary resrouces and interfaces with which user will interact via transactions and scripts
- Utility contracts are standardized Dapper contracts from which our custom contracts inherit many of their core functions.
## Transactions:
### Contains both true transactions (read-write capability) and scripts (read-only capability):
- Transactions are included in the subdirectories entitled admin, user, splitCollection, market, and marketV2 (soon to be deprecated).
- Scripts live in the scripts subdirectory.
## Execute:
### Shell scripts we use to facilitate transcations:
- These are currently only used for testing purposes, and are unlikely to be utilized in production.