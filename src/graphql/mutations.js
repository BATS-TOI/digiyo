/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFighters = /* GraphQL */ `
  mutation CreateFighters(
    $input: CreateFightersInput!
    $condition: ModelFightersConditionInput
  ) {
    createFighters(input: $input, condition: $condition) {
      id
      name
      country
      age
      height
      division
      style
      champion
      organization
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateFighters = /* GraphQL */ `
  mutation UpdateFighters(
    $input: UpdateFightersInput!
    $condition: ModelFightersConditionInput
  ) {
    updateFighters(input: $input, condition: $condition) {
      id
      name
      country
      age
      height
      division
      style
      champion
      organization
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteFighters = /* GraphQL */ `
  mutation DeleteFighters(
    $input: DeleteFightersInput!
    $condition: ModelFightersConditionInput
  ) {
    deleteFighters(input: $input, condition: $condition) {
      id
      name
      country
      age
      height
      division
      style
      champion
      organization
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createMints = /* GraphQL */ `
  mutation CreateMints(
    $input: CreateMintsInput!
    $condition: ModelMintsConditionInput
  ) {
    createMints(input: $input, condition: $condition) {
      id
      assetID
      CID
      instances
      name
      minter
      quantity
      description
      redemption
      mediaType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMints = /* GraphQL */ `
  mutation UpdateMints(
    $input: UpdateMintsInput!
    $condition: ModelMintsConditionInput
  ) {
    updateMints(input: $input, condition: $condition) {
      id
      assetID
      CID
      instances
      name
      minter
      quantity
      description
      redemption
      mediaType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMints = /* GraphQL */ `
  mutation DeleteMints(
    $input: DeleteMintsInput!
    $condition: ModelMintsConditionInput
  ) {
    deleteMints(input: $input, condition: $condition) {
      id
      assetID
      CID
      instances
      name
      minter
      quantity
      description
      redemption
      mediaType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createListings = /* GraphQL */ `
  mutation CreateListings(
    $input: CreateListingsInput!
    $condition: ModelListingsConditionInput
  ) {
    createListings(input: $input, condition: $condition) {
      id
      price
      item
      storefrontID
      seller
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateListings = /* GraphQL */ `
  mutation UpdateListings(
    $input: UpdateListingsInput!
    $condition: ModelListingsConditionInput
  ) {
    updateListings(input: $input, condition: $condition) {
      id
      price
      item
      storefrontID
      seller
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteListings = /* GraphQL */ `
  mutation DeleteListings(
    $input: DeleteListingsInput!
    $condition: ModelListingsConditionInput
  ) {
    deleteListings(input: $input, condition: $condition) {
      id
      price
      item
      storefrontID
      seller
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createSales = /* GraphQL */ `
  mutation CreateSales(
    $input: CreateSalesInput!
    $condition: ModelSalesConditionInput
  ) {
    createSales(input: $input, condition: $condition) {
      id
      price
      item
      storefrontID
      seller
      buyer
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSales = /* GraphQL */ `
  mutation UpdateSales(
    $input: UpdateSalesInput!
    $condition: ModelSalesConditionInput
  ) {
    updateSales(input: $input, condition: $condition) {
      id
      price
      item
      storefrontID
      seller
      buyer
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSales = /* GraphQL */ `
  mutation DeleteSales(
    $input: DeleteSalesInput!
    $condition: ModelSalesConditionInput
  ) {
    deleteSales(input: $input, condition: $condition) {
      id
      price
      item
      storefrontID
      seller
      buyer
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createCollections = /* GraphQL */ `
  mutation CreateCollections(
    $input: CreateCollectionsInput!
    $condition: ModelCollectionsConditionInput
  ) {
    createCollections(input: $input, condition: $condition) {
      id
      minter
      items
      collectionName
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateCollections = /* GraphQL */ `
  mutation UpdateCollections(
    $input: UpdateCollectionsInput!
    $condition: ModelCollectionsConditionInput
  ) {
    updateCollections(input: $input, condition: $condition) {
      id
      minter
      items
      collectionName
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteCollections = /* GraphQL */ `
  mutation DeleteCollections(
    $input: DeleteCollectionsInput!
    $condition: ModelCollectionsConditionInput
  ) {
    deleteCollections(input: $input, condition: $condition) {
      id
      minter
      items
      collectionName
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      id
      flowAddr
      name
      owned
      bought
      sold
      minted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
      flowAddr
      name
      owned
      bought
      sold
      minted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
      id
      flowAddr
      name
      owned
      bought
      sold
      minted
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
