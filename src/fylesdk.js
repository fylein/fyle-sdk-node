const fetch = require('node-fetch');

const exceptions = require('./exceptions');
const Projects = require('./apis/projects');

const {
    FyleSDKError,
    UnauthorizedClientError,
    NotFoundClientError,
    InternalServerError
} = exceptions;

module.exports = class FyleSDK {
    constructor(base_url, client_id, client_secret, refresh_token) {
        this.base_url = base_url;
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.refresh_token = refresh_token;

        this.Projects = new Projects();
    }

    async authenticate() {
        await this.update_access_token();
        await this.set_server_url();
    }

    async update_access_token() {
        let access_token = await this.get_access_token();
        this.Projects.change_access_token(access_token);
    }

    set_server_url() {
        this.Projects.set_server_url(this.base_url);
    }

    async get_access_token() {
        let content = {
            client_id: this.client_id,
            client_secret: this.client_secret,
            refresh_token: this.refresh_token,
            grant_type: 'refresh_token'
        };

        const tokenURL = `${this.base_url}/api/oauth/token`;

        let response = await fetch(tokenURL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(content)
        });
        let data = await response.json();

        if (response.status == 200) {
            return data['access_token'];
        } else if (response.status == 401) {
            throw new UnauthorizedClientError(
                'Wrong client secret or/and refresh token'
            );
        } else if (response.status == 404) {
            throw new NotFoundClientError("Client ID doesn't exist");
        } else if (response.status == 500) {
            throw new InternalServerError('Internal server error');
        } else {
            throw new FyleSDKError(`Error: ${response.status}`);
        }
    }
};
