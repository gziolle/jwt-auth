import { useUsersQuery } from "../generated/graphql";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data || loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div>users:</div>
      <ul>
        {data.users.map((user) => (
          <div key={user.id}>
            <div>{user.id}, {user.email}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};
