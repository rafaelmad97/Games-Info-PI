import "./viewGame.css";
import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { getVideogamesbyID } from "../../redux/actions";
import { connect } from "react-redux";

const ViewGame = (props) => {
  const { getVideogamesbyID } = props;
  const [result, setResults] = useState({});
  const params = useParams();
  const { state } = useLocation();
  const history = useHistory();
  if (state === undefined) {
    history.push("/home");
  }

  useEffect(() => {
    getVideogamesbyID(params.id)
      .then((res) => (state.isdb ? res.db : res.api))
      .then((res) =>
        setResults({
          id: state.isdb ? res[0].videogames.id : res.id,
          name: state.isdb ? res[0].videogames.nombre : res.name,
          rating: state.isdb ? res[0].videogames.rating : res.rating,
          background_image: state.isdb
            ? res[0].videogames.imagen
            : res.background_image,
          platforms: state.isdb ? res[0].videogames.plataformas : res.platforms,
          description: state.isdb
            ? res[0].videogames.Description
            : res.description,
          fecha_lanzamiento: state.isdb
            ? res[0].videogames.release_date
            : res.released,
          genres: state.isdb ? res[0].fav : res.genres,
        })
      );
  }, [getVideogamesbyID, params.id, state.isdb]);

  const generos = state.isdb
    ? result.genres?.map(({ id_genres }) => {
        return props.genres.find(({ id }) => id === id_genres)?.name;
      })
    : result.genres?.map((g) => g.name);

  const handleRating = () => {
    let stars = [];
    for (let i = 0; i < Math.floor(result?.rating); i++) {
      stars.push(i);
    }
    return stars;
  };

  const handleHome = () => {
    history.push("/home");
  };

  return (
    <>
      <div className="data_game">
        <h1>
          {result?.id} - {result?.name}
        </h1>
        <div className="star_container">
          <h3>{result?.rating}</h3>
          <div>
            {handleRating().map(() => (
              <div className="star" />
            ))}
          </div>
        </div>
        {state.isdb ? (
          <></>
        ) : (
          <ul className="list platforms">
            {result.platforms?.map((value) => (
              <li>{value.platform.name}</li>
            ))}
          </ul>
        )}
        <div dangerouslySetInnerHTML={{ __html: result.description }}></div>
        <br />
        <div>{result?.fecha_lanzamiento}</div>
        <br />
        <ul className="list generos">
          {generos?.map((genero) => (
            <li>{genero}</li>
          ))}
        </ul>
        <br />
        <div>
          <button className="go_home_button" onClick={handleHome} />
        </div>
        <br />
      </div>
      <img
        src={result?.background_image}
        className="imagen_game"
        alt={result?.name}
      />
    </>
  );
};

export const mapStateToProps = ({ genres }) => {
  return {
    genres,
  };
};

export const mapDispatchToProps = (dispatch, props) => {
  return {
    getVideogamesbyID: (name) => {
      return getVideogamesbyID(name);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewGame);
