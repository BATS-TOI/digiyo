/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFighters = /* GraphQL */ `
  subscription OnCreateFighters($filter: ModelSubscriptionFightersFilterInput) {
    onCreateFighters(filter: $filter) {
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
export const onUpdateFighters = /* GraphQL */ `
  subscription OnUpdateFighters($filter: ModelSubscriptionFightersFilterInput) {
    onUpdateFighters(filter: $filter) {
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
export const onDeleteFighters = /* GraphQL */ `
  subscription OnDeleteFighters($filter: ModelSubscriptionFightersFilterInput) {
    onDeleteFighters(filter: $filter) {
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
export const onCreateMints = /* GraphQL */ `
  subscription OnCreateMints($filter: ModelSubscriptionMintsFilterInput) {
    onCreateMints(filter: $filter) {
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
export const onUpdateMints = /* GraphQL */ `
  subscription OnUpdateMints($filter: ModelSubscriptionMintsFilterInput) {
    onUpdateMints(filter: $filter) {
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
export const onDeleteMints = /* GraphQL */ `
  subscription OnDeleteMints($filter: ModelSubscriptionMintsFilterInput) {
    onDeleteMints(filter: $filter) {
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
export const onCreateListings = /* GraphQL */ `
  subscription OnCreateListings($filter: ModelSubscriptionListingsFilterInput) {
    onCreateListings(filter: $filter) {
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
export const onUpdateListings = /* GraphQL */ `
  subscription OnUpdateListings($filter: ModelSubscriptionListingsFilterInput) {
    onUpdateListings(filter: $filter) {
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
export const onDeleteListings = /* GraphQL */ `
  subscription OnDeleteListings($filter: ModelSubscriptionListingsFilterInput) {
    onDeleteListings(filter: $filter) {
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
export const onCreateSales = /* GraphQL */ `
  subscription OnCreateSales($filter: ModelSubscriptionSalesFilterInput) {
    onCreateSales(filter: $filter) {
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
export const onUpdateSales = /* GraphQL */ `
  subscription OnUpdateSales($filter: ModelSubscriptionSalesFilterInput) {
    onUpdateSales(filter: $filter) {
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
export const onDeleteSales = /* GraphQL */ `
  subscription OnDeleteSales($filter: ModelSubscriptionSalesFilterInput) {
    onDeleteSales(filter: $filter) {
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
export const onCreateCollections = /* GraphQL */ `
  subscription OnCreateCollections(
    $filter: ModelSubscriptionCollectionsFilterInput
  ) {
    onCreateCollections(filter: $filter) {
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
export const onUpdateCollections = /* GraphQL */ `
  subscription OnUpdateCollections(
    $filter: ModelSubscriptionCollectionsFilterInput
  ) {
    onUpdateCollections(filter: $filter) {
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
export const onDeleteCollections = /* GraphQL */ `
  subscription OnDeleteCollections(
    $filter: ModelSubscriptionCollectionsFilterInput
  ) {
    onDeleteCollections(filter: $filter) {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
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
