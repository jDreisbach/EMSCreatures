import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import registerReducer from './registerReducer';
import productsReducer from './productsReducer'
import usersReducer from './usersReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import userOrderReducer from './userOrderReducer';


export default combineReducers({
    users: usersReducer,
    product: productsReducer,
    register: registerReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    userOrder: userOrderReducer,
    form: reduxForm
});