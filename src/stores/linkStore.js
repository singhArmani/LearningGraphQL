import AppDispatcher from '../AppDispatcher';
import * as ActionTypes from '../types';
import { EventEmitter } from 'events';

let _links = [];

class linkStore extends EventEmitter {
    constructor(props){
        super(props);

        AppDispatcher.register(action => {
            switch(action.actionType) {
                case ActionTypes.UPDATE_LINKS: 
                    _links = action.links;

                    // announce that something has changed
                    this.emit('change');
                    break;
                default: 
                    // do something
            }
        })
    }

    getAll() {
        return _links;
    }
}

export default new linkStore();