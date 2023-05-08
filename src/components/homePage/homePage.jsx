import { Component } from "react";
import * as actions from "../../redux/actions/index";
import { connect } from "react-redux";
import ListVideogames from "../listVideogames/listVideogames";

import "./homepage.css";
import SearchVideogame from "../searchVideogame/searchVideogame";

class HomePage extends Component {
  state = {
    pages: 0,
  };

  componentDidMount() {
    this.props.getGenres();
    this.props.getVideogames();
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <div className="content homepage">
          <SearchVideogame
            searchVideogame={this.props.getVideogamesbyName}
            searchedVideogame={this.props.searched_videogames}
            genres={this.props.genres}
          />
          <ListVideogames
            videogames={this.props.videogames}
            db_videogames={this.props.databases_videogames}
            genres={this.props.genres}
          />
        </div>
        <div className="background_home" />
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export const mapDispatchToProps = (dispatch, props) => {
  return {
    getGenres: () => {
      return dispatch(actions.getGenres());
    },
    getVideogames: () => {
      return dispatch(actions.getVideogames());
    },
    getVideogamesbyName: (name) => {
      return dispatch(actions.getVideogamesbyName(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
