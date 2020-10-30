import { asNexusMethod, makeSchema } from "@nexus/schema";
import { GraphQLUpload } from "apollo-server";
import {
  DateTimeResolver,
  JSONObjectResolver,
  JSONResolver,
} from "graphql-scalars";
import { nexusPrisma } from "nexus-plugin-prisma";
import { join } from "path";
import * as typeDefs from "./api";
const jsonScalar = asNexusMethod(JSONResolver, "json");
const jsonObjectScalar = asNexusMethod(JSONObjectResolver, "jsonObject");
const dateTimeScalar = asNexusMethod(DateTimeResolver, "date");
export const schema = makeSchema({
  types: [
    typeDefs,
    jsonScalar,
    jsonObjectScalar,
    dateTimeScalar,
    GraphQLUpload,
  ],
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
  outputs: {
    schema: join(__dirname, "/generated/schema.graphql"),
    typegen: join(__dirname, "/generated/nexus-typegen.ts"),
  },
  shouldGenerateArtifacts: true,
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: ".prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "Context",
      },
    ],
  },
});
