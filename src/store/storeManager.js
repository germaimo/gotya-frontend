import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import singleProyectReducer from "./singleProyectReducer";
import proyectsReducer from "./proyectsReducer";

const rootReducer = combineReducers({
  singleProject: singleProyectReducer,
  multipleProjects: proyectsReducer,
});

export default configureStore({
  rootReducer,
});
