const axios = require("axios");
module.exports = {
  auth0: (req, res) => {
    const payload = {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code: req.query.code,
      grant_type: "authorization_code",
      //   redirect_uri: `https://${req.headers.host}/auth/callback`
      redirect_uri: `http://${req.headers.host}/auth/callback`
    };

    function tradeCodeForAccessToken() {
      return axios.post(
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
        payload
      );
    }

    function tradeAccessTokenForUserInfo(accessTokenResponse) {
      const accessToken = accessTokenResponse.data.access_token;
      return axios.get(
        `https://${
          process.env.REACT_APP_AUTH0_DOMAIN
        }/userinfo?access_token=${accessToken}`
      );
    }

    function storeUserInfoInDatabase(response) {
      const auth0Id = response.data.sub;
      const db = req.app.get("db");
      let { name, picture, email } = response.data;
      return db
        .get_user_by_auth0_id(auth0Id)
        .then(user => {
          console.log(user);
          if (user.length) {
            req.session.user = user[0];
            res.redirect(`/${user[0].id}`);
          } else {
            return db
              .create_user({ auth0Id, name, email, picture, budget: 0 })
              .then(newUser => {
                console.log("newUser", newUser);
                req.session.user = newUser[0];
                res.redirect(`/${newUser[0].id}`);
              })
              .catch(error => {
                console.log("error in db.create_user", error);
                res.status(500).send("Unexpected error");
              });
          }
        })
        .catch(error => {
          console.log("error in db.get_user_by_auth0_id", error);
          res.status(500).send("Unexpected error");
        });
    }

    tradeCodeForAccessToken()
      .then(tradeAccessTokenForUserInfo)
      .then(storeUserInfoInDatabase)
      .catch(error => {
        console.log("error in /auth/callback", error);
        res.status(500).send("Unexpected error");
      });
  }
};
