/**
 * The Exception class for FyleSDK.
 */
class FyleSDKError extends Error {
  /**
   * @param {string} message Short description of the error
   */
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * The Exception class for Wrong client secret and/or refresh token, 401 error.
 */
class UnauthorizedClientError extends Error {
  /**
   * @param {string} message Short description of the error
   */
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * The Exception class for Client not found OAuth2 authorization, 404 error.
 */
class NotFoundClientError extends Error {
  /**
   * @param {string} message Short description of the error
   */
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * The Exception class for The rest FyleSDK errors, 500 error.
 */
class InternalServerError extends Error {
  /**
   * @param {string} message Short description of the error
   */
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * The Exception class for Expired (old) access token, 498 error.
 */
class ExpiredTokenError extends Error {
  /**
   * @param {string} message Short description of the error
   */
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * The Exception class for Wrong/non-existing access token, 401 error.
 */
class InvalidTokenError extends Error {
  /**
   * @param {string} message Short description of the error
   */
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * The Exception class for The user has insufficient privilege, 403 error.
 */
class NoPrivilegeError extends Error {
  /**
   * @param {string} message Short description of the error
   */
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * The Exception class for Some of the parameters (HTTP params or request body) are wrong, 400 error.
 */
class WrongParamsError extends Error {
  /**
   * @param {string} message Short description of the error
   */
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * The Exception class for Not found the item from URL, 404 error.
 */
class NotFoundItemError extends Error {
  /**
   * @param {string} message Short description of the error
   */
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  FyleSDKError,
  UnauthorizedClientError,
  NotFoundClientError,
  InternalServerError,
  ExpiredTokenError,
  InvalidTokenError,
  NoPrivilegeError,
  WrongParamsError,
  NotFoundItemError
}
