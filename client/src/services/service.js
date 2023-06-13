import axios from "axios";
import { setLoader } from "../actions/loaderAction";
import Store from "../Store";

const service = {
  serviceHeader: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // baseURL: "https://odyssey-music.herokuapp.com/api/",
  baseURL: "https://odyssey-music.netlify.app/api/",

  async getData(url, isSuccess, isError) {
    Store.dispatch(setLoader(true));
    axios
      .get(this.baseURL + url, { headers: service.serviceHeader })
      .then((response) => {
        Store.dispatch(setLoader(false));
        if (response.status === 200) {
          isSuccess(response.data);
        }
      })
      .catch((error) => {
        Store.dispatch(setLoader(false));
        isError(error);
      });
  },

  async updateData(url, isSuccess, isError) {
    axios
      .patch(this.baseURL + url, { headers: service.serviceHeader })
      .then((response) => {
        if (response.status === 200) {
          isSuccess(response.data);
        }
      })
      .catch((error) => {
        isError(error);
      });
  },
};

export default service;
