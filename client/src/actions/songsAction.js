import service from "../services/service";

export const fetchSongs = () => async (dispatch) => {
  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const isSuccess = (response) => {
    dispatch({
      type: "SONGS_FETCHED",
      payload: shuffle(response),
    });
  };
  const isError = (error) => {
    dispatch({
      type: "SONG_ERROR",
      payload: error,
    });
  };
  service.getData("song/songall", isSuccess, isError);
};

export const getSingleSong = (data) => (dispatch) => {
  dispatch({
    type: "SET_SINGLE",
    payload: data,
  });
};
