import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type FightersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MintsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ListingsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SalesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CollectionsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerFighters = {
  readonly id: string;
  readonly name: string;
  readonly country: string;
  readonly age: number;
  readonly height: string;
  readonly division: string[];
  readonly style: string[];
  readonly champion: boolean;
  readonly organization?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFighters = {
  readonly id: string;
  readonly name: string;
  readonly country: string;
  readonly age: number;
  readonly height: string;
  readonly division: string[];
  readonly style: string[];
  readonly champion: boolean;
  readonly organization?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Fighters = LazyLoading extends LazyLoadingDisabled ? EagerFighters : LazyFighters

export declare const Fighters: (new (init: ModelInit<Fighters, FightersMetaData>) => Fighters) & {
  copyOf(source: Fighters, mutator: (draft: MutableModel<Fighters, FightersMetaData>) => MutableModel<Fighters, FightersMetaData> | void): Fighters;
}

type EagerMints = {
  readonly id: string;
  readonly assetID: string;
  readonly CID: string;
  readonly instances?: number[] | null;
  readonly name: string;
  readonly minter: string;
  readonly quantity: number;
  readonly description: string;
  readonly redemption: string;
  readonly mediaType: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMints = {
  readonly id: string;
  readonly assetID: string;
  readonly CID: string;
  readonly instances?: number[] | null;
  readonly name: string;
  readonly minter: string;
  readonly quantity: number;
  readonly description: string;
  readonly redemption: string;
  readonly mediaType: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Mints = LazyLoading extends LazyLoadingDisabled ? EagerMints : LazyMints

export declare const Mints: (new (init: ModelInit<Mints, MintsMetaData>) => Mints) & {
  copyOf(source: Mints, mutator: (draft: MutableModel<Mints, MintsMetaData>) => MutableModel<Mints, MintsMetaData> | void): Mints;
}

type EagerListings = {
  readonly id: string;
  readonly price: number;
  readonly item: string;
  readonly storefrontID: string;
  readonly seller: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyListings = {
  readonly id: string;
  readonly price: number;
  readonly item: string;
  readonly storefrontID: string;
  readonly seller: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Listings = LazyLoading extends LazyLoadingDisabled ? EagerListings : LazyListings

export declare const Listings: (new (init: ModelInit<Listings, ListingsMetaData>) => Listings) & {
  copyOf(source: Listings, mutator: (draft: MutableModel<Listings, ListingsMetaData>) => MutableModel<Listings, ListingsMetaData> | void): Listings;
}

type EagerSales = {
  readonly id: string;
  readonly price: number;
  readonly item: string;
  readonly storefrontID: string;
  readonly seller: string;
  readonly buyer: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySales = {
  readonly id: string;
  readonly price: number;
  readonly item: string;
  readonly storefrontID: string;
  readonly seller: string;
  readonly buyer: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Sales = LazyLoading extends LazyLoadingDisabled ? EagerSales : LazySales

export declare const Sales: (new (init: ModelInit<Sales, SalesMetaData>) => Sales) & {
  copyOf(source: Sales, mutator: (draft: MutableModel<Sales, SalesMetaData>) => MutableModel<Sales, SalesMetaData> | void): Sales;
}

type EagerCollections = {
  readonly id: string;
  readonly minter: string;
  readonly items?: string[] | null;
  readonly collectionName: string;
  readonly description: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCollections = {
  readonly id: string;
  readonly minter: string;
  readonly items?: string[] | null;
  readonly collectionName: string;
  readonly description: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Collections = LazyLoading extends LazyLoadingDisabled ? EagerCollections : LazyCollections

export declare const Collections: (new (init: ModelInit<Collections, CollectionsMetaData>) => Collections) & {
  copyOf(source: Collections, mutator: (draft: MutableModel<Collections, CollectionsMetaData>) => MutableModel<Collections, CollectionsMetaData> | void): Collections;
}

type EagerUsers = {
  readonly id: string;
  readonly flowAddr: string;
  readonly name: string;
  readonly owned?: string[] | null;
  readonly bought?: string[] | null;
  readonly sold?: string[] | null;
  readonly minted?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUsers = {
  readonly id: string;
  readonly flowAddr: string;
  readonly name: string;
  readonly owned?: string[] | null;
  readonly bought?: string[] | null;
  readonly sold?: string[] | null;
  readonly minted?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Users = LazyLoading extends LazyLoadingDisabled ? EagerUsers : LazyUsers

export declare const Users: (new (init: ModelInit<Users, UsersMetaData>) => Users) & {
  copyOf(source: Users, mutator: (draft: MutableModel<Users, UsersMetaData>) => MutableModel<Users, UsersMetaData> | void): Users;
}