import APIUtil from '../api';

const api = new APIUtil();
class LinkAPI {
    getLinks(){
        return api.get('data/links');
    }
}

export default new LinkAPI();