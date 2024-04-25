import constants from "../constants/constants";

const { URL_KEYS } = constants;

const urls = {
  [URL_KEYS.LOGIN]: "http://localhost:4000/users/login",
  [URL_KEYS.SIGNUP]: "http://localhost:4000/users/signup",
};

export const getURL = (key) => urls[key];
