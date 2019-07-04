import React from "react";
import ReactDOM from "react-dom";
//setting up the apollo client
import ApolloClient from "apollo-client"; //makes requests for data and stores it on client side
import { ApolloProvider } from "react-apollo";
//react-router 3
import { Router, Route, hashHistory, IndexRoute } from "react-router";

import App from "./components/App";
import SongList from "./components/SongList";

const client = new ApolloClient({});

const Root = () => {
  return (
    //its better to wrap the Router with the Apollo client than the other way orund
    //React router is not set up to pass its child components to something like Apollo client
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
