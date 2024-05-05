import constants from "../constants/constants";

const { URL_KEYS } = constants;

const urls = {
  [URL_KEYS.LOGIN]: "http://localhost:4000/users/login",
  [URL_KEYS.PREFERNCES]: "http://localhost:4000/users/preferences",
  [URL_KEYS.ASSESSEMENTS]: "http://localhost:4000/users/assessments",
  [URL_KEYS.UPDATE_PASSWORD]: "http://localhost:4000/users/changePassword",
  [URL_KEYS.SIGNUP]: "http://localhost:4000/users/signup",
  [URL_KEYS.LANGUAGES]: "http://localhost:4000/languages",
  [URL_KEYS.COURSES]: "http://localhost:4000/courses",
  [URL_KEYS.ENROLL]: "http://localhost:4000/trackers/enroll",
  [URL_KEYS.COURSE_STATUS]: "http://localhost:4000/trackers/status",
  [URL_KEYS.MYCOURSES]: "http://localhost:4000/users/courses",
};

export const getURL = (key) => urls[key];
