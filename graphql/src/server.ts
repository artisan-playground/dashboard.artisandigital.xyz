import { ApolloServer } from "apollo-server";
import { createContext } from "./context";
import { schema } from "./schema";

const port = process.env.PORT || 4000;
new ApolloServer({ schema, context: createContext }).listen(
  { port: port },
  () => console.log(`🚀 Server ready at: http://localhost:${port}`)
);
