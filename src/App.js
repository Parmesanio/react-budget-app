import React, { Component } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import routes from "./routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
library.add(fab, fas);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
