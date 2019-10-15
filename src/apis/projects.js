const ApiBase = require('./api_base')

/**
 * Class for Projects APIs.
 */
module.exports = class Projects extends ApiBase {
  constructor () {
    super()
    Projects.GET_PROJECTS = '/api/tpa/v1/projects'
    Projects.POST_PROJECTS = '/api/tpa/v1/projects'
  }

  /**
   * Get the list of existing Projects.
   * @param {boolean} active_only When set as false, the result will include all the Projects for the organization. (optional)
   * @returns {Array} Array of Objects in Projects schema.
   */
  get (active_only = undefined) {
    return this.getRequest(
      {
        active_only: active_only
      },
      Projects.GET_PROJECTS
    )
  }

  /**
   * Create or Update Projects in bulk.
   * @param {Array} data Array of objects in Projects schema.
   * @returns {Array} Array with IDs from the new and updated Projects.
   */
  post (data) {
    return this.postRequest(data, Projects.POST_PROJECTS)
  }
}
