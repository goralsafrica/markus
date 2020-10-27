/**
 *
 * @param {} errors object containing the errors
 * @param {String} message summarized error message
 */

export function serverError(error, message) {
  return {
    status: 500,
    result: {
      data: null,
      errors: {
        request: error,
      },
      message,
    },
  };
}

/**
 *
 * @param {Object} errors object containing the errors
 * @param {String} message summarized error message
 */

export function badRequestError(errors, message) {
  return Promise.resolve({
    status: 400,
    result: {
      data: null,
      errors,
      message,
    },
  });
}

export function notFoundError(errors, message) {
  return Promise.resolve({
    status: 404,
    result: {
      data: null,
      errors,
      message,
    },
  });
}

export function notAllowedError(err, message) {
  return Promise.resolve({
    status: 403,
    result: {
      data: null,
      errors: {
        request: err,
      },
      message,
    },
  });
}

/**
 *
 * @param {String} message summarized error message
 */

export function unAuthorizedRequestError() {
  return {
    status: 401,
    errors: {
      request: "request was made with invalid credentials",
    },
    message: "failed to fulfill request",
  };
}

/**
 *
 * @param {} data object containing the data
 * @param {String} message summarized success  message
 */

export function successMessage(data, message) {
  return Promise.resolve({
    status: 200,
    result: {
      data,
      errors: null,
      message,
    },
  });
}

export function joiError(path, message) {
  const err = new Error();
  err.details = [
    {
      path,
      message,
    },
  ];
  return err;
}
