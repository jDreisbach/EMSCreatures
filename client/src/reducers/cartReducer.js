import { FETCH_CART, ADD_TO_CART, DELETE_FROM_CART } from '../actions/types';

export default function(state=[], action){
    switch (action.type){
        case ADD_TO_CART:
            return action.payload || false;
        case FETCH_CART:
            console.log(action.payload)
            return action.payload;
        case DELETE_FROM_CART:
            return state;
        default:
            return state;
    }
};