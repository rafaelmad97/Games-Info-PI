import { useEffect, useState } from "react";
import "./searchvideogame.css";
import CardDetail from "../cardDetail/cardDetail";

const SearchVideogame = (props) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.searchVideogame(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
          className="search_input"
        />
        <br />
        <button className="cleanSearch" onClick={(event) => handleClean()}>
          limpiar
        </button>
      </div>
      <br />
      {search !== "" && (
        <>
          {props.searchedVideogame.db !== undefined && (
            <>
              <h3>Mis Juegos</h3>
              <div className="results">
                {props.searchedVideogame.db?.map(({ videogames, fav }) => {
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
                {props.searchedVideogame.db.length === 0 && (
                  <h1>No hay resultados</h1>
                )}
              </div>
            </>
          )}
          <br />
          {props.searchedVideogame.api?.results !== undefined && (
            <>
              <h3> Fuente externa</h3>
              <br />
              <div className="results">
                {props.searchedVideogame?.api.results.map((videogame) => {
                  return (
                    <CardDetail videogame={videogame} key={videogame.id} />
                  );
                })}
                {props.searchedVideogame.api?.results.length === 0 && (
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

export default SearchVideogame;
