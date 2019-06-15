import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import nextSanitySchemas from "next-sanity-schemas/all";

export default createSchema({
  name: "default",
  types: [...schemaTypes, ...nextSanitySchemas]
});
