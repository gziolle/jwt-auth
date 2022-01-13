import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

function App() {
  const { data, loading } = useQuery(gql`
    {
      hello
    }
  `);

  if(loading){
    return <div>loading...</div>
  }
  return <div className="App">{JSON.stringify(data)}</div>;
}

export default App;
