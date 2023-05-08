import "./cardDetail.css";
const CardDetail = (props) => {
  const { isApivideogame, videogame } = props;

  const genres = isApivideogame
    ? videogame.genres.map(({ id_genres }) => id_genres)
    : videogame.genres.map(({ name }) => name);
  return (
    <div className="card">
      <img
        src={isApivideogame ? videogame.imagen : videogame.background_image}
        className="videogame_image"
        alt={isApivideogame ? videogame.nombre : videogame.name}
      />
      <p>{isApivideogame ? videogame.nombre : videogame.name}</p>
      {JSON.stringify(genres)}
    </div>
  );
};

export default CardDetail;
