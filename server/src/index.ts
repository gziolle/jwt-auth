import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken} from "./auth";
import { sendRefreshToken } from "./utils/sendRefreshToken";

(async () => {
  const app = express();
  // middleware used to parse any cookies sent by clients
  app.use(cookieParser());
  app.get("/", (_req: any, res) => {
    res.send("hello world");
  });

  app.post("/refresh_token", async (req, res) => {
    // jid is the name of the cookie
    const token = req.cookies.jid;

    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }
    // token is valid. We can find a user with the given user id
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    // if the token versions do not match, we can assume that
    // the token is invalid
    if(user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    // Found an user. We can return a new access token
    return res.send({ ok: true, accessToken: createAccessToken(user) });
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
