import React, { Component } from "react";
import { Link } from "react-router-dom";

class MoviesPage extends Component {
  state = {
    query: "",
    findMovies: []
  };

  componentDidMount() {
    if (this.props.location.state?.search) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=207c2cd605bda22c2345988002ae47b0&language=en-US&query=${
          this.props.location.state.search
        }&page=1&include_adult=false`
      )
        .then(response => response.json())
        .then(response =>
          this.setState({
            findMovies: response.results,
            query: this.props.location.state.search
          })
        );
    }
  }

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push({ search: `query=${this.state.query}` });
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=207c2cd605bda22c2345988002ae47b0&language=en-US&query=${
        this.state.query
      }&page=1&include_adult=false`
    )
      .then(response => response.json())
      .then(response => this.setState({ findMovies: response.results }));
  };

  render() {
    return (
      <>
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search favourite movie"
          />
          <button type="submit">Search</button>
        </form>

        <ul>
          {this.state.findMovies.map(movie => (
            <li key={movie.id}>
              <Link to={{ pathname: `/movies/${movie.id}`, state: { from: "/movies", query: this.state.query } }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default MoviesPage;
