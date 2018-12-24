import AppDispatcher from './AppDispatcher';
import * as ActionTypes from './types';

export function updateLinks(links){
    AppDispatcher.dispatch({
        actionType: ActionTypes.UPDATE_LINKS,
        links
    })
}