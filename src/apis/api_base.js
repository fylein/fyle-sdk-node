const fetch = require('node-fetch');
const { URL, URLSearchParams } = require('url');
const exceptions = require('../exceptions');

const {
    FyleSDKError,
    UnauthorizedClientError,
    NotFoundClientError,
    InternalServerError,
    ExpiredTokenError,
    InvalidTokenError,
    NoPrivilegeError,
    WrongParamsError,
    NotFoundItemError
} = exceptions;

module.exports = class ApiBase {
    constructor() {
        this.access_token = null;
        this.server_url = null;
    }

    change_access_token(access_token) {
        this.access_token = access_token;
    }

    set_server_url(server_url) {
        this.server_url = server_url;
    }

    async get_request(params, api_url) {
        Object.keys(params).forEach(
            key => params[key] === undefined && delete params[key]
        );

        Object.keys(params).forEach(
            key =>
                typeof params[key] === 'boolean' &&
                (params[key] = params[key].toString())
        );

        let url = new URL(`${this.server_url}${api_url}`);
        url.search = new URLSearchParams(params);

        let response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-type': 'application/json'
            }
        });
        let data = await response.json();
        if (response.status == 200) {
            return data;
        } else if (response.status == 400) {
            throw new WrongParamsError('Some of the parameters are wrong');
        } else if (response.status == 401) {
            throw new UnauthorizedClientError(
                'Wrong client secret or/and refresh token'
            );
        } else if (response.status == 403) {
            throw new NoPrivilegeError(
                'Forbidden, the user has insufficient privilege'
            );
        } else if (response.status == 404) {
            throw new NotFoundClientError("Client ID doesn't exist");
        } else if (response.status == 498) {
            throw new ExpiredTokenError('Expired token, try to refresh it');
        } else if (response.status == 500) {
            throw new InternalServerError('Internal server error');
        } else {
            throw new FyleSDKError(`Error: ${response.status}`);
        }
    }

    async post_request(data, api_url) {
        let url = `${this.server_url}${api_url}`;
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-type': 'application/json'
            },
            body: data
        });
        let output = await response.json();
        if (response.status == 200) {
            return output;
        } else if (response.status == 400) {
            throw new WrongParamsError('Some of the parameters are wrong');
        } else if (response.status == 401) {
            throw new UnauthorizedClientError(
                'Wrong client secret or/and refresh token'
            );
        } else if (response.status == 403) {
            throw new NoPrivilegeError(
                'Forbidden, the user has insufficient privilege'
            );
        } else if (response.status == 404) {
            throw new NotFoundClientError("Client ID doesn't exist");
        } else if (response.status == 498) {
            throw new ExpiredTokenError('Expired token, try to refresh it');
        } else if (response.status == 500) {
            throw new InternalServerError('Internal server error');
        } else {
            throw new FyleSDKError(`Error: ${response.status}`);
        }
    }
};
