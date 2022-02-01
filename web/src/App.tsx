import { gql, useQuery } from "@apollo/client";
import { useHelloQuery } from "./generated/graphql";

function App() {
  const { data, loading } = useHelloQuery();

  if (loading) return <div>loading...</div>;
  return <div>{JSON.stringify(data?.hello)}</div>;
}

export default App;
