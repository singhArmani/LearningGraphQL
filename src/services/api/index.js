import axios from 'axios';

import config from '../../config';

export default class APIUtil {
    constructor(host = config.host){
        this.host = host;
    }

    get(endpoint, config = {}){
        return axios.get(`${this.host}/${endpoint}`, config);
    }

    post(endpoint, data, config = {}){
        return axios.post(`${this.host}/${endpoint}`, data, config);
    }

}