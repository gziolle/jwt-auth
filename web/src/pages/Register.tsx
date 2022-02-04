import { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("form submitted");

        const response = await registerUser({
          variables: {
            email,
            password,
          },
        });

        console.log(response);
        navigate("/");
      }}
    >
      <div>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">register</button>
    </form>
  );
};
