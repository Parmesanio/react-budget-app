import React from "react";

const Login = props => {
  const login = () => {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/callback`
    );
    const scope = encodeURIComponent("openid profile email");
    window.location = `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/authorize?client_id=${
      process.env.REACT_APP_AUTH0_CLIENT_ID
    }&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`;
  };
  return <button onClick={login}>Log In</button>;
};

export default Login;
