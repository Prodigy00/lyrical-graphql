import React, { Component } from "react";
//necessary import for gql queries inside react
//gql is a helper function
import gql from "graphql-tag";
//glue layer between react and apollo
import { graphql } from "react-apollo";
import fetchSongs from "../queries/fetchSongs";
import deleteSongs from "../queries/deleteSongs";

import { Link } from "react-router";

class SongList extends Component {
  onSongDelete(id) {
    //how we run a mutation inside a component
    this.props
      .mutate({
        variables: {
          id
        }
      })
      .then(() => this.props.data.refetch());
    //you can't refetch on a delete mutation the way you would do it on a query mutation
    //you must call a this.props.data.refetch()
  }

  renderSongs() {
    //refactoring...\
    // return this.props.data.songs.map(song => {
    //   return (

    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

//  this says: make a helper using gql function and deleteSongs mutation
//  and immediately invoke it with the result of the nested helper with
//  the fetchSongs mutation and the SongList
export default graphql(deleteSongs)(graphql(fetchSongs)(SongList));
