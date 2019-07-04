import React from "react";
import ReactDOM from "react-dom";
//setting up the apollo client
import ApolloClient from "apollo-client"; //makes requests for data and stores it on client side
import { ApolloProvider } from "react-apollo";
//react-router 3
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import "./style/style.css";
import App from "./components/App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

const client = new ApolloClient({});

const Root = () => {
  return (
    //its better to wrap the Router with the Apollo client than the other way orund
    //React router is not set up to pass its child components to something like Apollo client
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
