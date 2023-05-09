import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./cardDetail.css";

const CardDetail = (props) => {
  const { isApivideogame, videogame, genres } = props;
  const history = useHistory();

  const genresvalues = isApivideogame
    ? videogame.genres.map(({ id_genres }) => {
        const indexgenre = genres?.findIndex((gen) => gen.id === id_genres);
        return indexgenre !== -1 ? genres[indexgenre].name : "";
      })
    : videogame.genres.map(({ name }) => name);

  const handleNav = () => {
    history.push(`/detail/${videogame.id}`, {
      isdb: isApivideogame,
    });
  };

  return (
    <div className="card" onClick={handleNav}>
      <div className="card_container">
        <img
          src={isApivideogame ? videogame.imagen : videogame.background_image}
          className="videogame_image"
          alt={isApivideogame ? videogame.nombre : videogame.name}
        />
        <p>{isApivideogame ? videogame.nombre : videogame.name}</p>
        <div className="view_genres">
          {genres !== undefined && (
            <>
              {genresvalues.map((value) => {
                return <p className="text_genres">{value}</p>;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const mapStateToProps = ({ genres }) => {
  return {
    genres,
  };
};

export default connect(mapStateToProps, undefined)(CardDetail);
