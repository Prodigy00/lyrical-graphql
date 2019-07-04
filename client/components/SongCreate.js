import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link, hashHistory } from "react-router";
import fetchSongs from "../queries/fetchSongs";

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: "" };
  }

  onSubmit(event) {
    //html forms attempt to submit themselves to the browser on default
    //we want to handle the submission ourselves so we prevent the default action
    event.preventDefault();
    //we try to reach out to our backend server here
    console.log(this.props);
    this.props
      .mutate(
        //configuration object containing our variables
        //whenever we insert a new record to a list appllo client needs to refetch
        //data from the backend
        {
          variables: {
            title: this.state.title
          },
          refetchQueries: [{ query: fetchSongs }]
        }
      )
      .then(() => hashHistory.push("/"));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

//dollar-sign:type
//name:dollar-sign
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;
//sandwich the mutation and the component using the graphql helperr from the apollo library
export default graphql(mutation)(SongCreate);
