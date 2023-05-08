/* 4️⃣ ***REDUCER*** 4️⃣ */

/* Importa las action-types aquí. */
import * as actions from "../actions/index";

const initialState = {
  genres: [],
  videogames: [],
  databases_videogames: [],
  searched_videogames: {},
};

/*
En este ejercicio tendrás que crear los casos de un reducer para gestionar la información de tu estado global.

📢¡Sigue las instrucciones de los TEST!📢

REQUISITOS
🟢 Crea un caso default, que devuelva el estado global sin cambios.
🟢 Crea un caso en el que, dentro del estado "celulares", se guarden todos los celulares.
🟢 Crea un caso en el que, dentro del estado "celularesDetail", se guarde el detalle de un celular.
🟢 Crea un caso en el que, dentro del estado "celulares", se agregue un nuevo celular.
    [PISTA]: puedes utilizar el spread operator.
🟢 Crea un caso en el que, dentro del estado "celulares", se elimine aquel celular cuyo ID es igual al recibido.

*/

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_GENRES:
      console.log(action.payload);
      return { ...state, genres: action.payload };
    case actions.GET_VIDEOGAMES:
      return { ...state, videogames: action.payload };
    case actions.GET_DATABASE_VIDEOGAMES:
      return { ...state, databases_videogames: action.payload };
    case actions.GET_VIDEOGAMES_BY_NAME:
      return { ...state, searched_videogames: action.payload };
    // case actions.GET_CELULARES_DETAIL:
    //   return { ...state, celularDetail: action.payload };
    // case actions.CREATE_CELULAR:
    //   return {
    //     ...state,
    //     celulares: [...state.celulares, action.payload],
    //   };
    // case actions.DELETE_CELULAR: {
    //   const index = state.celulares.findIndex(
    //     (cel) => cel.id === action.payload
    //   );
    //   const values = state.celulares;
    //   if (index !== -1) {
    //     delete values.splice(index, 1);
    //   }
    //   return {
    //     ...state,
    //     celulares: values,
    //   };
    // }
    default:
      return { ...state };
  }
};

export default rootReducer;
