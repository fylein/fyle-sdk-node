const fetch = require('node-fetch')

const exceptions = require('./exceptions')
const Projects = require('./apis/projects')

const {
  FyleSDKError,
  UnauthorizedClientError,
  NotFoundClientError,
  InternalServerError
} = exceptions

/**
 * The main class which creates a connection with Fyle APIs using OAuth2 authentication (refresh token grant type).
 */
module.exports = class FyleSDK {
  /**
   * @param {string} baseUrl Base URL for Fyle API
   * @param {string} clientId Client ID for Fyle API
   * @param {string} clientSecret Client Secret for Fyle API
   * @param {string} refreshToken - Refresh Token for Fyle API
   */
  constructor (baseUrl, clientId, clientSecret, refreshToken) {
    this.baseUrl = baseUrl
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.refreshToken = refreshToken

    this.Projects = new Projects()
  }

  /**
   * Set Base URL and Update Access Token
   */
  async authenticate () {
    await this.updateAccessToken()
    this.setServerUrl()
  }

  /**
   * Update the access token and change it in all API objects.
   */
  async updateAccessToken () {
    const accessToken = await this.getAccessToken()
    this.Projects.changeAccessToken(accessToken)
  }

  /**
   * Set the Base URL in all API objects.
   */
  setServerUrl () {
    this.Projects.setServerUrl(this.baseUrl)
  }

  /**
   * Get the access token using a HTTP post.
   * @returns {string} A new access token.
   */
  async getAccessToken () {
    const content = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: this.refreshToken,
      grant_type: 'refresh_token'
    }

    const tokenURL = `${this.baseUrl}/api/oauth/token`

    const response = await fetch(tokenURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(content)
    })
    const data = await response.json()

    if (response.status === 200) {
      return data.access_token
    } else if (response.status === 401) {
      throw new UnauthorizedClientError(
        'Wrong client secret or/and refresh token'
      )
    } else if (response.status === 404) {
      throw new NotFoundClientError("Client ID doesn't exist")
    } else if (response.status === 500) {
      throw new InternalServerError('Internal server error')
    } else {
      throw new FyleSDKError(`Error: ${response.status}`)
    }
  }
}
