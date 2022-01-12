import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { ApiContext } from "../ApiContext";

export const isAuth: MiddlewareFn<ApiContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try{
    // authorization is in the form of "Bearer token"
    const token = authorization.split(" ")[1];
    // verify the token using the secret env variable
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    // save the result (which has the user id) in the app's context
    context.payload = payload as any;
  } catch(err) {
    console.log(err)
    throw new Error("not authenticated");
  }
  // returns to the next middleware
  return next();
};
