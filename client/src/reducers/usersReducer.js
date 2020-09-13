import { FETCH_USERS, DELETE_USER } from '../actions/types';

export default function(state=[], action){
    switch (action.type){
        case FETCH_USERS:
            return action.payload;
        case DELETE_USER:
            return state;
        default:
            return state;
    };
};