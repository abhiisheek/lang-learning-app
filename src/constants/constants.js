const rightDrawerWidth = 482;

const constants = {
  URL_KEYS: {
    LOGIN: "LOGIN",
    SIGNUP: "SIGNUP",
    LANGUAGES: "LANGUAGES",
    COURSES: "COURSES",
    PREFERNCES: "PREFERNCES",
    ENROLL: "ENROLL",
    MYCOURSES: "MYCOURSES",
    COURSE_STATUS: "COURSE_STATUS",
  },
  SESSIONSTORAGE_KEYS: {
    USERDETAILS: "userDetails",
  },
  API_META: {
    DEFAULT_HEADER: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
    },
    MULTIPART_FORM_DATA: {
      "Content-Type": "multipart/form-data",
    },
    METHOD: {
      GET: "GET",
      POST: "POST",
      PUT: "PUT",
      DELETE: "DELETE",
    },
    STATUS_CODE: {
      UNAUTHORIZED: 401,
      CREATED: 201,
      ACCEPTED: 202,
      EXISTS: 409,
      SUCCESS: 200,
    },
  },
  NAV_SIDE_BAR: {
    WIDTH: 300,
  },
  RECIPES_DRAWER: {
    WIDTH: rightDrawerWidth,
  },
  HEADER: {
    HEIGHT: 68,
  },
  USER_DETAILS_CONTEXT: {
    name: "",
    email: "",
    shortId: "TU",
    token: "",
  },
  USER_PREFERNCE_CONTEXT: {
    langs: {},
  },
  UI_SETTINGS_CONTEXT: {
    openRightDrawer: false,
    rightDrawerWidth,
    onOpenRightDrawer: () => {},
    onCloseRightDrawer: () => {},
  },
  STATUS_MAP: {
    NOT_STARTED: { label: "Not Started", color: "info" },
    IN_PROGRESS: { label: "In Progress", color: "warning" },
    COMPLETED: { label: "Completed", color: "success" },
  },
  LEVEL_MAP: {
    1: { label: "Beginner" },
    2: { label: "Intermediate" },
    3: { label: "Advanced" },
  },
};

export default constants;
