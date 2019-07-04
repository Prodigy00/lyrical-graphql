import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSongList from "../queries/fetchSongList";
import { Link } from "react-router";

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if (!song) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>

        <h3>{song.title}</h3>
      </div>
    );
  }
}
//unlike like mutations there's no clear location to add query variables for Queries
//this is how it's done:
export default graphql(fetchSongList, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
