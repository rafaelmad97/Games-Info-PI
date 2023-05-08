import CardDetail from "../cardDetail/cardDetail";
import "./listVideogames.css";
import { useState } from "react";

const ListVideogames = (props) => {
  const [pages, setPages] = useState(1);
  const [pagesdb, setPagesDb] = useState(1);
  const [byGenero, setbyGenero] = useState(-1);
  const [byOrigen, setbyOrigen] = useState("all");

  const handleSetPage = (value) => {
    setPages(value);
  };

  const handleSetPagedb = (value) => {
    setPagesDb(value);
  };

  const handleSlice = (isdb) => {
    const elements = isdb ? 5 : 15;
    const endindex = (isdb ? pagesdb : pages) * elements;
    let values = isdb ? props.db_videogames : props.videogames;
    if (values.length !== 0) {
      if (endindex - elements < 0) {
        values = values.slice(endindex);
      } else {
        if (endindex === elements) {
          values = values.slice(0, endindex);
        } else {
          values = values.slice(endindex - elements, endindex);
        }
      }
    }
    return values;
  };

  const handlesetbyGenero = (event) => {
    setbyGenero(event.target.value);
  };
  const handlesetbyOrigen = (event) => {
    setbyOrigen(event.target.value);
  };

  return (
    <>
      <div className="container_options">
        <div className="item">
          <select
            placeholder="Origen"
            className="selecfilters"
            value={byOrigen}
            onChange={handlesetbyOrigen}
          >
            <option value="all">Origen</option>
            <option value="api">Api</option>
            <option value="bd">Base de datos</option>
          </select>
        </div>
        <div className="item">
          <select
            placeholder="Genero"
            className="selecfilters"
            value={byGenero}
            onChange={handlesetbyGenero}
          >
            <option value={-1}>Genero</option>

            {props.genres.map((genre) => (
              <option value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
      </div>
      {(byOrigen === "all" || byOrigen === "bd") && (
        <>
          <h1> Mis Juegos</h1>
          <div className="videogames">
            {handleSlice(true).map(({ videogames, fav }) => {
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
            {handleSlice(true).length === 0 && <h3> Nada por aqui</h3>}
          </div>
          <br />
          <br />
          <div className="pages">
            {pagesdb !== 1 && (
              <button
                onClick={() => handleSetPagedb(pagesdb - 1)}
                className="back"
              ></button>
            )}
            <div className="cuadro">
              <h3>{pagesdb}</h3>
            </div>
            {handleSlice(true).length !== 0 && (
              <button
                onClick={() => handleSetPagedb(pagesdb + 1)}
                className="foward"
              ></button>
            )}
          </div>
        </>
      )}
      <br />
      <br />
      {(byOrigen === "all" || byOrigen === "api") && (
        <>
          <h1> Juegos en la api</h1>
          <div className="videogames">
            {handleSlice(false).map((videogame) => {
              return (
                <CardDetail
                  videogame={videogame}
                  key={videogame.id}
                  isApivideogame={false}
                  genres={props.genres}
                />
              );
            })}
            {handleSlice(false).length === 0 && <h3> Nada por aqui</h3>}
          </div>
          <br />
          <br />
          <div className="pages">
            {pages !== 1 && (
              <button
                onClick={() => handleSetPage(pages - 1)}
                className="back"
              ></button>
            )}
            <div className="cuadro">
              <div className="cuadroInterno">
                <h3>{pages}</h3>
              </div>
            </div>
            {handleSlice(false).length !== 0 && (
              <button
                onClick={() => handleSetPage(pages + 1)}
                className="foward"
              ></button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ListVideogames;
