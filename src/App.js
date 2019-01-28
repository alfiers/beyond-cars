import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import Details from "./containers/Details";
import NotFound from "./containers/NotFound";
import "./App.css";

import Loader from "./components/Loader";
import Header from "./components/Header";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    const { loading } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route exact path="/c/:id" component={Details} />
          <Route path="/" component={NotFound} />
        </Switch>
        {loading && <Loader />}
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return { loading: state.app.loading };
}

export default connect(mapStateToProps)(App);
