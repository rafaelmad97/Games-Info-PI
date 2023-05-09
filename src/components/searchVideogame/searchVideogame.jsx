import { useEffect, useState } from "react";
import "./searchvideogame.css";
import CardDetail from "../cardDetail/cardDetail";
import { getVideogamesbyName } from "../../redux/actions";
import { connect } from "react-redux";

const SearchVideogame = (props) => {
  const searchVideogame = props.getVideogamesbyName;

  const [search, setSearch] = useState("");

  useEffect(() => {
    searchVideogame(search);
  }, [search, searchVideogame]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleClean = () => {
    setSearch("");
  };

  return (
    <>
      <div className="content_search">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="Buscar Juego"
          className="search search_shadow"
        />
        <br />
        <button className="cleanSearch" onClick={(event) => handleClean()}>
          Limpiar Resultados
        </button>
      </div>
      <br />
      {search !== "" && (
        <>
          {props.searched_videogames.db !== undefined && (
            <>
              <h3>Mis Juegos</h3>
              <div className="results">
                {props.searched_videogames.db?.map(({ videogames, fav }) => {
                  return (
                    <CardDetail
                      videogame={{
                        ...videogames,
                        genres: fav,
                      }}
                      key={videogames.id}
                      isApivideogame={true}
                    />
                  );
                })}
                {props.searched_videogames.db.length === 0 && (
                  <h1>No hay resultados</h1>
                )}
              </div>
            </>
          )}
          <br />
          {props.searched_videogames.api?.results !== undefined && (
            <>
              <h3> Fuente externa</h3>
              <br />
              <div className="results">
                {props.searched_videogames?.api.results.map((videogame) => {
                  return (
                    <CardDetail videogame={videogame} key={videogame.id} />
                  );
                })}
                {props.searched_videogames.api?.results.length === 0 && (
                  <h1>No hay resultados</h1>
                )}
              </div>
            </>
          )}
        </>
      )}

      <br />
    </>
  );
};

export const mapStateToProps = ({ searched_videogames, genres }) => {
  return {
    searched_videogames,
    genres,
  };
};

export const mapDispatchToProps = (dispatch, props) => {
  return {
    getVideogamesbyName: (name) => {
      return dispatch(getVideogamesbyName(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideogame);
