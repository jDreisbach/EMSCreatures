import { FETCH_PRODUCT, CREATE_PRODUCT } from '../actions/types';

export default function(state=[], action){
    switch (action.type){
        case CREATE_PRODUCT:
            return action.payload || false;
        case FETCH_PRODUCT:
            return action.payload;
        default:
            return state;
    }
};