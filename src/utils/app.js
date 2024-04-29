import { decodeToken } from "react-jwt";

export const deduceUserDetailsFromToken = (token) => {
  const {name, email} = decodeToken(token)?.data;
  const shortId = `${name[0]}${name[name.length - 1]}`;

  return {
    token,
    name,
    email,
    shortId,
  };
};
