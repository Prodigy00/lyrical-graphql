import React, { Component } from "react";
//necessary import for gql queries inside react
//gql is a helper function
import gql from "graphql-tag";
//glue layer between react and apollo
import { graphql } from "react-apollo";

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return <ul className="collection">{this.renderSongs()}</ul>;
  }
}

//defining query
const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
