import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AppRoutes from "./AppRoutes";
import { getAccessToken } from "./accessToken";

const SERVER_URI = "http://localhost:4000/graphql";

const httpLink = createHttpLink({
  uri: SERVER_URI,
});

const authLink = setContext((_, { headers,  ...context }) => {
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: SERVER_URI,
  credentials: "include",
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRoutes />
  </ApolloProvider>,
  document.getElementById("root")
);
