import { decodeToken } from "react-jwt";
import e1 from "../images/english_1.png";
import e2 from "../images/english_2.png";
import e3 from "../images/english_3.png";
import h1 from "../images/hindi_1.png";
import h2 from "../images/hindi_2.png";
import h3 from "../images/hindi_3.png";
import g1 from "../images/german_1.png";
import g2 from "../images/german_2.png";
import g3 from "../images/german_3.png";

export const deduceUserDetailsFromToken = (token) => {
  const { name, email } = decodeToken(token)?.data;
  const splitData = name.split(/ +/);

  const shortId =
    splitData.length > 1
      ? `${splitData[0][0]}${splitData[1][0]}`
      : `${name[0]}${name[name.length - 1]}`;

  return {
    token,
    name,
    email,
    shortId: shortId.toUpperCase(),
  };
};

const IMG_MAP = {
  english_1: e1,
  english_2: e2,
  english_3: e3,
  hindi_1: h1,
  hindi_2: h2,
  hindi_3: h3,
  german_1: g1,
  german_2: g2,
  german_3: g3,
};

export const getImagesByLangAndLevel = (langLabel = "", level = "") => {
  return IMG_MAP[langLabel.toLowerCase() + "_" + level] || e1;
};
