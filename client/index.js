import React from "react";
import ReactDOM from "react-dom";
//setting up the apollo client
import ApolloClient from "apollo-client"; //makes requests for data and stores it on client side
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>Lyrical</div>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
