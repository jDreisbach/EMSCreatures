import { CREATE_USER } from '../actions/types';

export default function(state={}, action){
    switch (action.type){
        case CREATE_USER:
            return action.payload || false;
        default:
            return state;
    };
};