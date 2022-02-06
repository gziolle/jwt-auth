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
import App from './App';

const SERVER_URI = "http://localhost:4000/graphql";

const httpLink = createHttpLink({
 uri: SERVER_URI,
 credentials: "include", 
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
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
