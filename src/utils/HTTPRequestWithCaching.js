import cloneDeep from "lodash/cloneDeep";
import axios from "axios";

const needsPayload = {
  POST: true,
  PUT: true,
  PATCH: true,
  DELETE: true,
};

const SUCCESS_STATUS_CODES = {
  200: true,
  201: true,
  202: true,
};

const HTTP_METHODS = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PATCH: "PATCH",
  PUT: "PUT",
};

export class HTTPRequestWithCaching {
  static getFromCache(key) {
    const item = HTTPRequestWithCaching.cache[key];

    if (item) {
      if (item.expireTime < new Date().getTime()) {
        console.warn("Deleting expired cache item");
        delete HTTPRequestWithCaching.cache[key];
      } else {
        console.warn("Item found in cache");

        return item.data;
      }
    }
  }

  static insertToCache(obj, key, cacheExpireDuration) {
    obj.expireTime = new Date().getTime() + cacheExpireDuration;
    this.cache[key] = obj;
  }

  /* eslint-disable max-params */
  static httpRequest({
    url,
    reqParams = {},
    method = HTTP_METHODS.GET,
    reqHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
    },
    cacheResponse = false,
    cacheExpireDuration = 5 * 60000, // In milliseconds (5mins default)
    isMultiPart = false,
    formatterFunc,
    token,
    setAuthorizationInHeader = true,
  }) {
    return new Promise((resolve, reject) => {
      const paramsStr = JSON.stringify(reqParams);
      const cacheKey = `${paramsStr}${url}`;

      const data = HTTPRequestWithCaching.getFromCache(cacheKey);

      if (data && cacheResponse && !isMultiPart) {
        resolve(cloneDeep(data));
      } else {
        let payload = {};

        if (needsPayload[method]) {
          payload = { data: isMultiPart ? reqParams : paramsStr };
        }

        const headers = { ...reqHeaders };

        if (setAuthorizationInHeader) {
          headers.Authorization = `Bearer ${token}`;
        }

        axios({ url, method, headers, ...payload }).then(
          (res) => {
            const { status, data: responseData } = res;

            if (SUCCESS_STATUS_CODES[status]) {
              const formattedData =
                typeof formatterFunc === "function"
                  ? formatterFunc(responseData)
                  : responseData;

              if (cacheResponse && !isMultiPart) {
                HTTPRequestWithCaching.insertToCache(
                  {
                    data: cloneDeep(formattedData),
                  },
                  cacheKey,
                  cacheExpireDuration
                );
              }

              resolve(formattedData);
            } else {
              reject({
                status,
                errorMessage:
                  "There seems to be a problem, please retry after sometime.",
              });
            }
          },
          (error) => {
            const errorData =
              (error.response && error.response.data) ||
              (error.toJSON && error.toJSON()) ||
              {};

            reject({
              status: errorData.status || 404,
              errorMessage: errorData.message || errorData,
            });
          }
        );
      }
    });
  }
}

HTTPRequestWithCaching.cache = {};
