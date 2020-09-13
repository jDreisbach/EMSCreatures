import { CREATE_ORDER, PAYMENT_SUCCESS, FETCH_ORDERS } from '../actions/types';

export default function(state=[], action){
    switch (action.type){
        case CREATE_ORDER:
            return action.payload || false;
        case PAYMENT_SUCCESS:
            return action.payload || false;
        case FETCH_ORDERS:
            return action.payload || false;
        default:
            return state;
    }
};