import {
  ObjectType,
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { User } from "./entity/User";
import { compare, hash } from "bcryptjs";
import { ApiContext } from "./ApiContext";
import { createAccessToken, createRefreshToken } from "./auth";
import { isAuth } from "./middlewares/isAuth";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi!";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: ApiContext) {
    console.log(payload);
    return `your user id is ${payload!.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: ApiContext
  ): Promise<LoginResponse> {
    // tries to find a user with the given email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("could not find user");
    }

    // validates the password with the given user
    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("bad email or password");
    }

    // creates a refresh token and stores it in a cookie
    res.cookie("jid", createRefreshToken(user), {
      httpOnly: true,
    });

    // Returns an access token if the user was validated correctly
    // The token is created with jsonwebtoken
    return {
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 12);
    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
