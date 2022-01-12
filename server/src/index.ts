import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";

(async () => {
  const app = express();
  app.get("/", (_req: any, res) => {
    res.send("hello world");
  });

  // Create a connection to the database 
  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => console.log("Express server is running on port 4000"));
})();
