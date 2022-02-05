import { useByeQuery } from "../generated/graphql";

export const Bye = () => {
  const { data, loading, error } = useByeQuery();

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if(!data) {
    return <div>no data</div>
  }

  return <div>{data.bye}</div>
};
