import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSongList from "../queries/fetchSongList";
import { Link } from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    //always make sure your data is available before you try
    //to consume it in some way
    if (!song) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
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
