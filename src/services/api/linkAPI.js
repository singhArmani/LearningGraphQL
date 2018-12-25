import APIUtil from '../api';

import * as LinkActions from '../../actions';

const api = new APIUtil();
class LinkAPI {
    async getLinks(){
        const response =  await api.post('graphql',
            { 
                query: 
                  `{links {
                    _id,
                    title,
                    url
                    }
                  }`
        });
        LinkActions.updateLinks(response.data.data.links);
    }
}

export default new LinkAPI();