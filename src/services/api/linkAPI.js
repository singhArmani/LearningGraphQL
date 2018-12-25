import APIUtil from '../api';

import * as LinkActions from '../../actions';

const api = new APIUtil();
class LinkAPI {
    async getLinks(){
        const response =  await api.get('data/links');
        LinkActions.updateLinks(response.data);
    }
}

export default new LinkAPI();