import React, { Component, Suspense } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Cast from "./Cast";
import Reviews from "./Reviews";

class MovieDetailsPage extends Component {
  state = {
    detailedInfo: {},
    name: "",
    back: {}
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.movieId;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=207c2cd605bda22c2345988002ae47b0&language=en-US`
      );
      const data = await response.json();
      //   console.log(data);
      this.setState({ detailedInfo: data, back: this.props.location.state });
    } catch (error) {}
  }

  handleGoingBack = () => {
    const { history } = this.props;

    if (this.state.back?.query) {
      history.push({
        pathname: this.state.back.from,
        state: { search: this.state.back.query },
        search: `query=${this.state.back?.query}`
      });
    } else history.push("/");
  };

  render() {
    const { poster_path, title, release_date, vote_average, overview, genres } = this.state.detailedInfo;
    return (
      <>
        <button type="button" onClick={this.handleGoingBack}>
          Go Back
        </button>
        <div className="movieDetailsContainer">
          <div className="movieImg">
            {poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={title} />
            ) : (
              <h3>Not this time, hun:( We've got nothing on this movie's pic</h3>
            )}
          </div>

          <h3>
            {title} ({parseInt(release_date)})
          </h3>
          <p>User Score: {vote_average}</p>
          <h4>Overview</h4>
          <p>{overview}</p>
          <h4>Genres</h4>
          <ul>{genres && genres.map(({ id, name }) => <li key={id}> {name} </li>)}</ul>
        </div>

        <p>Additional Information</p>
        <ul className="" key={this.state.id}>
          <li>
            <NavLink className="list" to={`${this.props.match.url}/cast`}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink className="list" to={`${this.props.match.url}/reviews`}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Switch>
            <Route path="/movies/:movieId/cast" component={Cast} />
            <Route path="/movies/:movieId/reviews" component={Reviews} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default MovieDetailsPage;