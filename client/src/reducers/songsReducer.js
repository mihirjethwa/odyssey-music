const initialState = {
  data: [],
  singleSongData: [],
  error: "",
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SONGS_FETCHED":
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case "SET_SINGLE":
      return {
        ...state,
        singleSongData: action.payload,
        error: "",
      };
    case "SONG_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default songsReducer;
