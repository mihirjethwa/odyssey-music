import { combineReducers } from "redux";
import songsReducer from "./songsReducer";
import albumReducer from "./albumReducer";
import loaderReducer from "./loaderReducer";
import searchReducer from "./searchReducer";
import languageReducer from "./languageReducer";

const rootReducer = combineReducers({
  songs: songsReducer,
  albums: albumReducer,
  loader: loaderReducer,
  search: searchReducer,
  language: languageReducer,
});

export default rootReducer;
