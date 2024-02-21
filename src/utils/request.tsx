import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from './config';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = config.publicPath + config.basePath + '/api';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url: string, options?: AxiosRequestConfig) {
    return axios({ url, ...options })
        .then(checkStatus)
        .then(parseJSON);
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: AxiosResponse) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error: any = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: AxiosResponse): any | null {
    if (response.status === 204 || response.status === 205 || response.status === 504) {
        return null;
    }
    return response.data;
}
