const fetch = require('node-fetch')
const { URL, URLSearchParams } = require('url')
const exceptions = require('../exceptions')

const {
  FyleSDKError,
  UnauthorizedClientError,
  NotFoundClientError,
  InternalServerError,
  ExpiredTokenError,
  NoPrivilegeError,
  WrongParamsError
} = exceptions

/**
 * The base class for all API classes.
 */
module.exports = class ApiBase {
  constructor () {
    this.accessToken = null
    this.serverUrl = null
  }

  /**
   * Change the old access token with the new one.
   * @param {string} accessToken The new access token.
   */
  changeAccessToken (accessToken) {
    this.accessToken = accessToken
  }

  /**
   * Set the server URL dynamically upon creating a connction.
   * @param {string} serverUrl The current server URL
   */
  setServerUrl (serverUrl) {
    this.serverUrl = serverUrl
  }

  /**
   * Make a HTTP GET request.
   * @param {object} params HTTP GET parameters for the wanted API.
   * @param {string} apiUrl URL for the wanted API.
   * @returns {object} A response from the request.
   */
  async getRequest (params, apiUrl) {
    Object.keys(params).forEach(key => {
      if (params[key] === undefined) { delete params[key] }
    })

    Object.keys(params).forEach(key => {
      if (typeof params[key] === 'boolean') { params[key] = params[key].toString() }
    })

    const url = new URL(`${this.serverUrl}${apiUrl}`)
    url.search = new URLSearchParams(params)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-type': 'application/json'
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      return data
    } else if (response.status === 400) {
      throw new WrongParamsError('Some of the parameters are wrong')
    } else if (response.status === 401) {
      throw new UnauthorizedClientError(
        'Wrong client secret or/and refresh token'
      )
    } else if (response.status === 403) {
      throw new NoPrivilegeError(
        'Forbidden, the user has insufficient privilege'
      )
    } else if (response.status === 404) {
      throw new NotFoundClientError("Client ID doesn't exist")
    } else if (response.status === 498) {
      throw new ExpiredTokenError('Expired token, try to refresh it')
    } else if (response.status === 500) {
      throw new InternalServerError('Internal server error')
    } else {
      throw new FyleSDKError(`Error: ${response.status}`)
    }
  }

  /**
   * Make a HTTP post request.
   * @param {object} data  HTTP POST body data for the wanted API.
   * @param {string} apiUrl  URL for the wanted API.
   * @returns {object} A response from the request.
   */
  async postRequest (data, apiUrl) {
    const url = `${this.serverUrl}${apiUrl}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-type': 'application/json'
      },
      body: data
    })
    const output = await response.json()
    if (response.status === 200) {
      return output
    } else if (response.status === 400) {
      throw new WrongParamsError('Some of the parameters are wrong')
    } else if (response.status === 401) {
      throw new UnauthorizedClientError(
        'Wrong client secret or/and refresh token'
      )
    } else if (response.status === 403) {
      throw new NoPrivilegeError(
        'Forbidden, the user has insufficient privilege'
      )
    } else if (response.status === 404) {
      throw new NotFoundClientError("Client ID doesn't exist")
    } else if (response.status === 498) {
      throw new ExpiredTokenError('Expired token, try to refresh it')
    } else if (response.status === 500) {
      throw new InternalServerError('Internal server error')
    } else {
      throw new FyleSDKError(`Error: ${response.status}`)
    }
  }
}
