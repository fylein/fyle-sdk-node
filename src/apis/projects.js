const ApiBase = require('./api_base');

module.exports = class Projects extends ApiBase {
    constructor() {
        super();
        Projects.GET_PROJECTS = '/api/tpa/v1/projects';
        Projects.POST_PROJECTS = '/api/tpa/v1/projects';
    }

    get(active_only = undefined) {
        return this.get_request(
            {
                active_only: active_only
            },
            Projects.GET_PROJECTS
        );
    }

    post(data) {
        return this.post_request(data, Projects.POST_PROJECTS);
    }
};
