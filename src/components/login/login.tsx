
import React, { useState } from "react";
import PropTypes from "prop-types";

export async function LoginUser(credentials: {}) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}


export const Login = ({ setToken }: any) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const token = await LoginUser({
            username,
            password
        });
        setToken(token)
    }

  return (
    <div className="flex flex-col items-center">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

Login.prototype = {
  setToken: PropTypes.func.isRequired,
};
