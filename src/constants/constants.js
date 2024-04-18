const rightDrawerWidth = 482;

const constants = {
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
    HEIGHT: 92,
  },
  USER_DETAILS_CONTEXT: {
    name: "Test User",
    email: "test.user@abc.com",
    shortId: "TU",
  },
  UI_SETTINGS_CONTEXT: {
    openRightDrawer: false,
    rightDrawerWidth,
    onOpenRightDrawer: () => {},
    onCloseRightDrawer: () => {},
  },
};

export default constants;
