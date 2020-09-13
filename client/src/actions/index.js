import axios from 'axios';
import {FETCH_USER, FETCH_PRODUCT, FETCH_USERS, DELETE_PRODUCT, CREATE_ORDER, FETCH_USER_ORDER, FETCH_ORDERS} from './types';
import {CREATE_USER, PAYMENT_SUCCESS} from './types';
import {CREATE_PRODUCT} from './types';
import {DELETE_USER} from './types';
import {ADD_TO_CART, DELETE_FROM_CART, FETCH_CART} from './types'
import users from '../components/admin/users/Users';
import product from '../components/admin/products/ManageProducts';
import cartItem from '../components/cart/Cart'

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const localUser = () => async (dispatch) => {
    const res = await axios.post('/api/login');
    dispatch({ type: FETCH_USER, payload: res.data});
};

export const createUser = () => async (dispatch) => {
    const res = await axios.post('/api/register');
    dispatch({type: CREATE_USER, payload: res.data});
};

export const createProduct =()=> async (dispatch) => {
    const res = await axios.post('/api/admin/products');
    dispatch({type: CREATE_PRODUCT, payload: res.data});

};

export const fetchProduct = () => async (dispatch) => {
    const res = await axios.get('/api/products');
    dispatch({type: FETCH_PRODUCT, payload: res.data});
};

export const fetchUsers = () => async (dispatch) => {
    const res = await axios.get('/api/users');
    dispatch({type: FETCH_USERS, payload: res.data});
};

export const deleteUser = () => async (dispatch) => {
    const _id=users._id;
    const res = await axios.get('/api/users/delete/:id', { data : { id: _id }});
    dispatch({type: DELETE_USER, payload: res.data});
};

export const deleteProduct = () => async (dispatch) => {
    const _id = product._id;
    const res = await axios.get('/api/products/delete/:id', { data : { id: _id }});
    dispatch({ type: DELETE_PRODUCT, payload: res.data });
};

export const addToCart = () => async (dispatch) => {
    const _id = product._id;
    const res = await axios.post('/api/addtocart/:id', { data : { id: _id }});
    console.log(res.data)
    dispatch({ type: ADD_TO_CART, payload: res.data });
};

export const deleteFromCart = () => async (dispatch) => {
    const _id= cartItem._id;
    const res = await axios.get('/api/removefromcart/:id', { data: { id: _id }});
    dispatch({ type: DELETE_FROM_CART, payload: res.data });
};

export const fetchCart = () => async (dispatch) => {
    const _id = users._id;
    const res = await axios.get('/api/cart/:id', { data : { id: _id }});
    console.log(res.data)
    dispatch({ type: FETCH_CART, payload: res.data });
};

export const createOrder = () => async (dispatch) => {
    const res = await axios.post('/api/pay');
    dispatch({ type: CREATE_ORDER, payload: res.data});
};

export const paymentSuccess = () => async (dispatch) => {
    const res= await axios.get('/success');
    dispatch({ type: PAYMENT_SUCCESS, payload: res.data });
};

export const fetchUserOrder = () => async (dispatch)=> {
    const _id = users._id;
    const res = await axios.get('/api/myorders/:id', { data : { id: _id }});
    dispatch({ type: FETCH_USER_ORDER , payload: res.data });
};

export const fetchOrders = () => async (dispatch) => {
    const res = await axios.get('/api/admin/orders');
    dispatch({ type: FETCH_ORDERS,  payload: res.data });
};