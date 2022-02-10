import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken, setAccessToken } from "./accessToken";
import App from "./App";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode, { JwtPayload } from "jwt-decode";

const SERVER_URI = "http://localhost:4000/graphql";

const requestLink = createHttpLink({
  uri: SERVER_URI,
  credentials: "include",
});

const authLink = setContext((_, { headers, ...context }) => {
  const token = getAccessToken();

  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
      ...context,
    };
  }
});

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) {
      return true;
    }
    try {
      const { exp } = jwtDecode<JwtPayload>(token);

      if (!exp) return false;

      if (Date.now() >= exp * 1000) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
      mode: "cors",
    });
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    // full control over handling token fetch Error
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: SERVER_URI,
  link: ApolloLink.from([tokenRefreshLink, authLink, requestLink]),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
