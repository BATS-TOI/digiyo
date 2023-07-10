// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Fighters, Mints, Listings, Sales, Collections, Users } = initSchema(schema);

export {
  Fighters,
  Mints,
  Listings,
  Sales,
  Collections,
  Users
};