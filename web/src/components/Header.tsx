import { Link } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const Header: React.FC = () => {
  const { data } = useMeQuery({ fetchPolicy: "network-only" });
  const [logout, { client }] = useLogoutMutation();

  let body = null;

  if (!body) {
    body = null;
  }
  if (data?.me) {
    body = <div>you are logged in as {data.me.email}</div>;
  } else {
    body = <div> not logged in</div>;
  }

  const logoutUser = async () => {
    await logout();
    setAccessToken("");
    await client!.resetStore();
  };
  return (
    <header>
      {body}
      <div>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/register">register</Link>
      </div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/bye">bye</Link>
      </div>
      <div>
        <button onClick={logoutUser}>logout</button>
      </div>
    </header>
  );
};

export default Header;
