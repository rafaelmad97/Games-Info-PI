import { useHistory } from "react-router-dom";
import CardDetail from "../cardDetail/cardDetail";
import "./listVideogames.css";
import { useState } from "react";

const ListVideogames = (props) => {
  const history = useHistory();
  const [pages, setPages] = useState(1);
  const [pagesdb, setPagesDb] = useState(1);
  const [byGenero, setbyGenero] = useState(-1);
  const [byOrden, setbyOrden] = useState(1);
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
    let values = isdb
      ? props.db_videogames.sort((a, b) => handleSort(a, b, isdb))
      : props.videogames.sort((a, b) => handleSort(a, b, isdb));

    isdb
      ? (values = values.filter(filterGenresdb))
      : (values = values.filter(filterGenresapi));
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

  const handleSort = (a, b, isdb) => {
    let a_name = isdb ? a.videogames.nombre : a.name;
    let b_name = isdb ? b.videogames.nombre : b.name;
    let a_rating = isdb ? a.videogames.rating : a.rating;
    let b_rating = isdb ? b.videogames.rating : b.rating;
    switch (byOrden) {
      case 1:
        return a_name > b_name ? 1 : -1;
      case 2:
        return b_name > a_name ? 1 : -1;
      case 3:
        return a_rating < b_rating ? 1 : -1;
      case 4:
        return b_rating < a_rating ? 1 : -1;
      default:
        return false;
    }
  };

  const handlesetbyGenero = (event) => setbyGenero(Number(event.target.value));

  const handlesetbyOrigen = (event) => setbyOrigen(event.target.value);

  const handlesetbyOrden = (event) => setbyOrden(Number(event.target.value));

  const filterGenresdb = ({ videogames, fav }) => {
    if (byGenero !== -1) {
      return (
        fav.findIndex(({ id_genres }) => id_genres === Number(byGenero)) !== -1
      );
    } else {
      return true;
    }
  };

  const filterGenresapi = (values) => {
    if (byGenero !== -1) {
      const index = props.genres.findIndex(({ id }) => id === byGenero);

      return (
        values.genres.findIndex(
          ({ name }) => name === props.genres[index].name
        ) !== -1
      );
    } else {
      return true;
    }
  };

  const handleCreate = () => {
    history.push("/crear");
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
        <div className="item">
          <select
            placeholder="Orden"
            className="selecfilters"
            value={byOrden}
            onChange={handlesetbyOrden}
          >
            <option value={1}>Ascendente</option>
            <option value={2}>Descendente</option>
            <option value={3}>Rating (ASC)</option>
            <option value={4}>Rating (DESC)</option>
          </select>
        </div>
        <div className="item">
          <button className="addVideogame" onClick={handleCreate}>
            Agregar Videojuego
          </button>
        </div>
      </div>
      {(byOrigen === "all" || byOrigen === "bd") && (
        <>
          <h1> Mis Juegos</h1>
          <div className="videogames">
            {handleSlice(true).map(({ videogames, fav }) => {
              console.log(fav);
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
            <div className="button_nav">
              {pagesdb !== 1 && (
                <button
                  onClick={() => handleSetPagedb(pagesdb - 1)}
                  className="button_nav back"
                ></button>
              )}
            </div>
            <div className="cuadro">
              <h3>{pagesdb}</h3>
            </div>
            <div className="button_nav">
              {handleSlice(true).length !== 0 && (
                <button
                  onClick={() => handleSetPagedb(pagesdb + 1)}
                  className="button_nav foward"
                ></button>
              )}
            </div>
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
                />
              );
            })}
            {handleSlice(false).length === 0 && <h3> Nada por aqui</h3>}
          </div>
          <br />
          <br />
          <div className="pages">
            <div className="button_nav">
              {pages !== 1 && (
                <button
                  onClick={() => handleSetPage(pages - 1)}
                  className="button_nav back"
                ></button>
              )}
            </div>
            <div className="cuadro">
              <div className="cuadroInterno">
                <h3>{pages}</h3>
              </div>
            </div>
            <div className="button_nav">
              {handleSlice(false).length !== 0 && (
                <button
                  onClick={() => handleSetPage(pages + 1)}
                  className="button_nav foward"
                ></button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListVideogames;
