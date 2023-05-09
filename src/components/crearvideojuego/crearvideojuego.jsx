import "./crearvideojuego.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createVideoGame } from "../../redux/actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Crearvideojuego = (props) => {
  const dispatch = useDispatch();
  const [genero, setGenero] = useState(-1);
  const history = useHistory();

  const [form, setForm] = useState({
    nombre: "",
    plataformas: "",
    rating: 0,
    generos: [],
    imagen: "",
    Description: "",
    release_date: new Date(),
  });

  const [errors, setErrors] = useState({
    nombre: "",
    plataformas: "",
    rating: "",
    generos: "",
  });

  const validate = (state, errorsState) => {
    const errors = { ...errorsState };
    if (state.nombre.length > 30)
      errors.nombre = "Nombre del juego es demasiado largo";
    else errors.nombre = "";
    if (state.plataformas.length < 0)
      errors.plataformas = "El juego debe tener una plataforma";
    else errors.plataformas = "";
    if (Number(state.rating) < 0) errors.rating = "El rating minimo es 1";
    else errors.rating = "";
    if (state.generos.length === 0) {
      errors.generos =
        "El videojuego debe por lo menos estar asociado a un solo género";
    } else errors.generos = "";
    return errors;
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    const err = validate({ ...form, [property]: value }, errors);
    setErrors({ ...err });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const log = `${errors.generos}${errors.nombre}${errors.plataformas}${errors.rating}`;
    if (log.length === 0) {
      dispatch(createVideoGame(form));
    }
  };

  const handleShowGeneros = () => {
    const val = form.generos.map(({ id }) => {
      return props.genres.find((gen) => gen.id === id);
    });
    return val;
  };

  const handleSetGenero = (event) => {
    setGenero(Number(event.target.value));
  };

  const handleAddGeneros = () => {
    if (genero !== -1) {
      const item = props.genres.find(({ id }) => id === genero);
      if (item !== undefined) {
        setForm({ ...form, generos: [...form.generos, item] });
      }
    }
    setGenero(-1);
  };

  const filterselectedgenres = ({ id }) =>
    form.generos.find((gen) => gen.id === id) === undefined;

  const handleDelete = (id) => {
    setForm({
      ...form,
      generos: form.generos.filter((gen) => gen.id !== id),
    });
  };

  const handleGoHome = () => {
    history.push("/home");
  };

  return (
    <>
      {JSON.stringify(Boolean(errors))}

      <div className="data_game">
        <form onSubmit={submitHandler}>
          {form.imagen.length !== 0 && (
            <div>
              <img
                src={form.imagen}
                alt="imagen"
                className="imagen_form_game"
              />
            </div>
          )}
          <div className="item_form">
            <label htmlFor="imagen">URL Imagen: </label>
            <input
              type="url"
              name="imagen"
              className="field"
              value={form.imagen}
              onChange={handleChange}
            />
          </div>
          <div className="item_form">
            <label htmlFor="nombre">Nombre: </label>
            <input
              type="text"
              name="nombre"
              className="field"
              value={form.nombre}
              onChange={handleChange}
            />
            {Boolean(errors.nombre) && <p>{errors?.nombre}</p>}
          </div>
          <div className="item_form">
            <label htmlFor="plataformas">Plataformas: </label>
            <input
              type="text"
              name="plataformas"
              className="field"
              value={form.plataformas}
              onChange={handleChange}
            />
            {Boolean(errors.plataformas) && <p>{errors?.nombre}</p>}
          </div>

          <div className="item_form">
            <label htmlFor="release_date">Lanzamiento: </label>
            <input
              type="date"
              name="release_date"
              className="field"
              value={form.release_date}
              onChange={handleChange}
            />
          </div>

          <div className="item_form">
            <label htmlFor="Description">Descripcion: </label>
            <textarea
              type="text"
              name="Description"
              className="field"
              value={form.Description}
              onChange={handleChange}
            />
          </div>
          <div className="item_form">
            <label htmlFor="rating">Rating: </label>
            <input
              type="number"
              name="rating"
              className="field"
              value={form.rating}
              onChange={handleChange}
            />
            {Boolean(errors.rating) && <p>{errors?.rating}</p>}
          </div>
          <div className="item_multiple">
            <div className="item_form">
              <div>
                <select
                  placeholder="Genero"
                  className="selecfilters"
                  value={genero}
                  onChange={handleSetGenero}
                >
                  <option value={-1}>Genero</option>
                  {props.genres.filter(filterselectedgenres).map((genre) => (
                    <option value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <button className="addVideogame" onClick={handleAddGeneros}>
                  Agregar genero
                </button>
              </div>
            </div>
            <ul className="list generos">
              {handleShowGeneros().map((gen) => (
                <div className="item_form">
                  <li>{gen.name} </li>
                  <button
                    className="delete"
                    onClick={() => handleDelete(gen.id)}
                  ></button>
                </div>
              ))}
            </ul>
            {Boolean(errors.generos) && <p>{errors?.generos}</p>}
          </div>
          <br />
          <div className="item_form">
            <button type="submit" className="button_form guardar" />
            <button
              type="submit"
              className="button_form home"
              onClick={handleGoHome}
            />
          </div>
        </form>
      </div>
      <img
        src="https://cdn.dribbble.com/users/772/screenshots/803156/screen_shot_2012-11-06_at_11.26.06_am.png"
        alt="download"
        className="imagen_game"
      />
    </>
  );
};

export const mapStateToProps = ({ genres }) => {
  return {
    genres,
  };
};

export default connect(mapStateToProps, undefined)(Crearvideojuego);
