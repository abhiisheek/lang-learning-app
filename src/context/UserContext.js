import { createContext } from "react";

import constants from "../constants/constants";

const UserContext = createContext(constants.USER_DETAILS_CONTEXT);

export { UserContext };
