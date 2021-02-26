const initialState = {
  language: [],
  error: "",
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LANGUAGE_FETCHED":
      return {
        ...state,
        language: action.payload,
      };
    case "LANGUAGE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;
