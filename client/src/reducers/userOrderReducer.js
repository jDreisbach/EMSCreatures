import { FETCH_USER_ORDER } from '../actions/types';

export default function(state=[], action){
    switch (action.type){
        case FETCH_USER_ORDER:
            return action.payload || false;
        default:
            return state;
    };
};