import React from "react";

const Login = props => {
  console.log(props);

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
  return (
    <button className="signup" onClick={login}>
      Sign up
    </button>
  );
};

export default Login;
