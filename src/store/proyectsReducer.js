// projectsReducer.js
import * as typeActions from "./tipoAcciones";

const initialState = {
  projectsList: [],
  // ... otras propiedades relacionadas con la gestión de proyectos ...
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeActions.AGREGAR_PROYECTO:
      // Lógica para agregar un proyecto a projectsList
      return {
        ...state,
        projectsList: [...state.projectsList, action.payload.project],
      };
    case typeActions.REMOVER_PROYECTO:
      // Lógica para eliminar un proyecto de projectsList
      return {
        ...state,
        projectsList: state.projectsList.filter(
          (project) => project.id !== action.payload.projectId
        ),
      };
    case typeActions.GET_PROYECTOS:
        return{
            ...state
        };  
    // ... otras acciones relacionadas con proyectos ...
    default:
      return state;
  }
};

export default projectsReducer;
