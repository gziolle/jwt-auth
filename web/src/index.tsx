import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import AppRoutes from "./AppRoutes";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
  credentials: 'include',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRoutes />
  </ApolloProvider>,
  document.getElementById("root")
);
