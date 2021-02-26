import service from "../services/service";

export const fetchLanguage = () => async (dispatch) => {
  const isSuccess = (response) => {
    let result = response.map((val) => val.language);
    dispatch({
      type: "LANGUAGE_FETCHED",
      payload: result,
    });
  };
  const isError = (error) => {
    dispatch({
      type: "LANGUAGE_ERROR",
      payload: error,
    });
  };
  service.getData("language/languageall", isSuccess, isError);
};
