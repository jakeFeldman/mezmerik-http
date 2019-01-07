/**
 *
 * @module http
 * @description A chainable class that wraps the fetch API
 *
 */
class HttpRequest {
    constructor (url, options) {
        this.url = url;
        this.options = options || {};
    }

    withToken (token) {
        const headers = Object.assign({}, this.options.headers || {}, {
            Authorization: `Bearer ${token}`
        });

        Object.assign(this.options, {
            headers
        });

        return this;
    }

    withJsonBody (body) {
        const headers = Object.assign({}, this.options.headers || {}, {
            'Content-Type': 'application/json'
        });

        Object.assign(this.options, {
            body: JSON.stringify(body),
            headers
        });

        return this;
    }

    acceptJson () {
        const headers = Object.assign({}, this.options.headers || {}, {
            Accept: 'application/json'
        });

        Object.assign(this.options, {
            headers
        });

        return this;
    }

    accept (type) {

    }

    del () {
        this.options.method = 'DELETE';
        return this;
    }

    patch () {
        this.options.method = 'PATCH';
        return this;
    }

    post () {
        this.options.method = 'POST';
        return this;
    }

    put () {
        this.options.method = 'PUT';
        return this;
    }

    request () {
        let promise = fetch(this.url, this.options);
        let abort = promise.abort;
        promise = promise
            .then(checkHttpStatus)
            .catch(unauthorizedRedirect)
            .then(parseResponse);
        promise.abort = abort;
        return promise;
    }
}

/**
 *
 * @param {(Object|Error)} error
 */
function unauthorizedRedirect (error) {
    let response;
    if (error && error.response) {
        response = error.response;
    }
    else {
        response = error;
    }

    // Unauthorized
    return response;
}

/**
 *
 * @param {Object} response
 */
function checkHttpStatus (response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

/**
 *
 * @param {Object} response
 */
function parseResponse (response) {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
}

/**
 *
 * @param {String} url
 * @param {Object} opts
 */
export default function http (url, opts) {
    return new HttpRequest(url, opts);
}
