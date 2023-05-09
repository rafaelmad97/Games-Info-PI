const API_URL = true
  ? "https://gamespiapi-production.up.railway.app"
  : "http://localhost:3001";

export const GET_GENRES = "GET_GENRES";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_DATABASE_VIDEOGAMES = "GET_DATABASE_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";

export const getGenres = () => {
  return async function (dispatch) {
    await fetch(`${API_URL}/genres`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: GET_GENRES,
          payload: res.genres,
        })
      )
      .finally();
  };
};

export const getVideogames = () => {
  return async function (dispatch) {
    await fetch(`${API_URL}/videogames`)
      .then((res) => res.json())
      .then(({ api, database }) => {
        dispatch({
          type: GET_VIDEOGAMES,
          payload: api,
        });
        return database;
      })
      .then((database) => {
        dispatch({
          type: GET_DATABASE_VIDEOGAMES,
          payload: database,
        });
      })
      .finally();
  };
};

export const getVideogamesbyName = (name) => {
  return async function (dispatch) {
    await fetch(`${API_URL}/videogames?name=${name}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: GET_VIDEOGAMES_BY_NAME,
          payload: res,
        });
      })
      .finally();
  };
};

export const getVideogamesbyID = async (id) => {
  return await fetch(`${API_URL}/videogames/${id}`)
    .then((res) => res.json())
    .finally();
};

export const createVideoGame = async (formdata) => {
  console.log(formdata);
  // return await fetch(`${API_URL}/videogames`,{
  //   method: "POST",
  //   body: JSON.stringify({

  //   })
  // })
};
/* 3️⃣ ***ACTIONS*** 3️⃣ */

//📢 Puedes utilizar axios si lo deseas, solo debes importarlo 📢

// export const GET_ALL_CELULARES = "GET_ALL_CELULARES";
// export const GET_CELULARES_DETAIL = "GET_CELULARES_DETAIL";
// export const CREATE_CELULAR = "CREATE_CELULAR";
// export const DELETE_CELULAR = "DELETE_CELULAR";

// 🟢 getAllCelulares:
// Esta función debe realizar una petición al Back-End. Luego despachar una action con la data recibida.
// End-Point: 'http://localhost:3001/celulares'.
// export const getAllCelulares = () => {
//   return async function (dispatch) {
//     await axios
//       .get("http://localhost:3001/celulares")
//       .then((res) =>
//         dispatch({
//           type: GET_ALL_CELULARES,
//           payload: res.data,
//         })
//       )
//       .finally();
//   };
// };

// 🟢 getCelularesDetails:
// Esta función debe hacer una petición al Back-End. Ten en cuenta que tiene que recibir la variable "id" por
// parámetro. Luego despachar una action con la data recibida.
// End-Point: 'http://localhost:3001/celulares/:id'.
// export const getCelularDetails = (id) => {
//   return async function (dispatch) {
//     await axios
//       .get(`http://localhost:3001/celulares/${id}`)
//       .then((res) =>
//         dispatch({
//           type: GET_CELULARES_DETAIL,
//           payload: res.data,
//         })
//       )
//       .finally();
//   };
// };

// 🟢 createCelular:
// Esta función debe recibir una variable "celulares" por parámetro.
// Luego retornar una action que, en su propiedad payload:
//    - haga un spread operator de la variable celulares, para copiar todo su contenido.
//    - tenga una nueva propiedad "id" igual a la variable de abajo, pero con un incremento +1.
// Descomenta esta variable cuando la necesites.
// let id = 6;
// export const createCelular = (payload) => {
//   return { type: CREATE_CELULAR, payload: { ...payload, id: id++ } };
// };

// 🟢 deleteCelular:
// Esta función debe retornar una action. En su propiedad "payload" guardarás el ID recibido por parámetro.
// export const deleteCelular = (id) => {
//   return { type: DELETE_CELULAR, payload: id };
// };
