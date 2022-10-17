import defaultsDeep from 'lodash/defaultsDeep';
import isEmpty from 'lodash/isEmpty';
import queryString from 'querystring';
import { superagentToObservable } from '@bibliocommons/utils-http';

const sub = (val, substitutions) => substitutions[val] || val;

/**
 * Client for the NERF API gateway. Implemented as a "universal/isomorphic"
 * class that can be used on both server and browser.
 */
class ApiClient {
  /**
   * Constructor for ApiClient
   * @usage: `new ApiClient(httpClient, options)`
   *
   * @param {object} httpClient  - Module that the ApiClient will use to make HTTP requests.
   *                               According to APIClient's universal design, this can be
   *                               different for server and browser uses -- any library that
   *                               is API compatible with Superagent will do.
   *
   * @param {object} options   - An object with any of the following properties:
   *    @property {string} apiGatewayURL  - Base URL of the API gateway
   *    @property {string} subdomain      - The subdomain of the current library
   *    @property {string} locale         - The current locale
   *    @property {object} headers        - Custom headers to send (e.g. cookie, user-agent,
   *                                          x-forwarded-for, x-requested-with)
   *
   */
  constructor(httpClient, { apiGatewayURL, subdomain, locale, sessionId, authToken, headers = {} }) {
    Object.assign(this, {
      httpClient,
      apiGatewayURL,
      sessionId,
      authToken,
      requestLocale: locale,
      requestHeaders: headers,
      _server: !!__SERVER__,
      _routeSubstitutions: {
        ':librarySubdomain': subdomain
      }
    });
  }

  /**
   * It does the GET request on both client and server.
   *
   * @param  {string} path          - relative path (eg, '/search')
   * @param  {Object} options       - additional request properties;
                                      also see `getFullUrl()`
   * @param {string} options.Accept - value of the Accept request header
                                      (default: 'application/json')
   */
  get(path, options = {}) {
    return this._request('get', path, null, options);
  }

  /**
   * It does the POST request on both client and server.
   *
   * @param  {string} path          - relative path (eg, '/search')
   * @param  {Object} data          - data to be sent in the POST body
   * @param  {Object} options       - additional request properties;
                                      also see `getFullUrl()`
   * @param {string} options.Accept - value of the Accept request header
                                      (default: 'application/json')
   */
  post(path, data = {}, options = {}) {
    return this._request('post', path, data, options);
  }

  /**
   * It does the Patch request on both client and server.
   *
   * @param  {string} path          - relative path (eg, '/search')
   * @param  {Object} data          - data to be sent in the PATCH body
   * @param  {Object} options       - additional request properties; also see `getFullUrl()`
   * @param   {string} options.Accept - value of the Accept request header
                                        (default: 'application/json')
   */
  patch(path, data = {}, options = {}) {
    return this._request('patch', path, data, options);
  }

  /**
   * It does the PUT request on both client and server.
   *
   * @param  {string} path          - relative path (eg, '/search')
   * @param  {Object} data          - data to be sent in the PUT body
   * @param  {Object} options       - additional request properties; also see `getFullUrl()`
   * @param   {string} options.Accept - value of the Accept request header
                                        (default: 'application/json')
   */
  put(path, data = {}, options = {}) {
    return this._request('put', path, data, options);
  }

  /**
   * It does the DELETE request on both client and server.
   *
   * @param  {string} path          - relative path (eg, '/search')
   * @param  {Object} data          - data to be sent in the body
   * @param  {Object} options       - additional request properties; also see `getFullUrl()`
   * @param {string} options.Accept - value of the Accept request header
                                      (default: 'application/json')
   */
  delete(path, data = {}, options = {}) {
    return this._request('del', path, data, options);
  }

  /**
   * Helper method for constructing full URL
   *
   * @param  {object} path    - base path of the URL like /search or /item/show
   * @param  {object} options - additional url properties:
   * @param  {string} options.params - the dynamic part of the path eg. /item/show/:id
   * @param  {object} options.query  - Object which converts into query string
   * @return {string}
   */
  getFullUrl(path, options = {}) {
    const { params, query } = defaultsDeep(options, {
      query: this.requestLocale ? { locale: this.requestLocale } : {}
    });

    const queryStr = isEmpty(query) ? '' : `?${queryString.stringify(query)}`;
    return `${this.apiGatewayURL}${path || ''}${params || ''}${queryStr}`;
  }

  /**
   * Template tag function that builds a route string from a template
   * literal, with support for "magic" substitution of contextual params.
   *
   * @see `ApiClient#routeSubstitutions`.
   *
   * @example
   *   const apiClient = new ApiClient(httpClient, [other args]);
   *   const bibId     = '12345';
   *   const route     = apiClient.route `/libraries/${':libraryDomain'}/bibs/${someBibId}`;
   *   console.info(route); // '/libraries/opl/bibs/12345'
   *
   * @implements {TagFunction}
   * @return {string} the interpolated path
   */
  route(segments, ...values) {
    let path = segments[0];
    // Build the path, inserting route substitutions where needed
    values.forEach((val, i) => {
      path += sub(val, this._routeSubstitutions) + segments[i + 1];
    });
    return path;
  }

  /**
   * Makes a request to the API
   * @param  {string} method  HTTP method
   * @param  {string} path    relative path of API endpoint
   * @param  {object} options
   * @return {Promise}        Promise which will resolve / reject based of status of request
   */
  _request(method, path, data = null, options = {}) {
    const client = this.httpClient[method](this.getFullUrl(path, options)).set(
      'Accept',
      options.Accept || 'application/json'
    );

    if (data) {
      client.send(data);
    }

    if (!this._server) {
      client.withCredentials();
    }

    if (this.sessionId && this.authToken) {
      client.set('X-Session-Id', this.sessionId);
      client.set('X-Access-Token', this.authToken);
    }

    Object.keys(this.requestHeaders).forEach(headerKey => {
      if (this.requestHeaders[headerKey]) {
        client.set(headerKey, this.requestHeaders[headerKey]);
      }
    });

    return superagentToObservable(client);
  }
}

export default ApiClient;
