/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFighters = /* GraphQL */ `
  query GetFighters($id: ID!) {
    getFighters(id: $id) {
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
export const listFighters = /* GraphQL */ `
  query ListFighters(
    $filter: ModelFightersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFighters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncFighters = /* GraphQL */ `
  query SyncFighters(
    $filter: ModelFightersFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFighters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getMints = /* GraphQL */ `
  query GetMints($id: ID!) {
    getMints(id: $id) {
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
export const listMints = /* GraphQL */ `
  query ListMints(
    $filter: ModelMintsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncMints = /* GraphQL */ `
  query SyncMints(
    $filter: ModelMintsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMints(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getListings = /* GraphQL */ `
  query GetListings($id: ID!) {
    getListings(id: $id) {
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
export const listListings = /* GraphQL */ `
  query ListListings(
    $filter: ModelListingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncListings = /* GraphQL */ `
  query SyncListings(
    $filter: ModelListingsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncListings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getSales = /* GraphQL */ `
  query GetSales($id: ID!) {
    getSales(id: $id) {
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
export const listSales = /* GraphQL */ `
  query ListSales(
    $filter: ModelSalesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSales(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSales = /* GraphQL */ `
  query SyncSales(
    $filter: ModelSalesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSales(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getCollections = /* GraphQL */ `
  query GetCollections($id: ID!) {
    getCollections(id: $id) {
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
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncCollections = /* GraphQL */ `
  query SyncCollections(
    $filter: ModelCollectionsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCollections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
