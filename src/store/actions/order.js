import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        //for loading bar
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fectchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fectchOrdersFail = (error) => {
    return  {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fectchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fectchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fectchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        
        axios.get('/orders.json' + queryParams).then(res => {
            const fectchedOrders = [];
            for (let key in res.data) {
                fectchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fectchOrdersSuccess(fectchedOrders));
        })
        .catch(error => {
            dispatch(fectchOrdersFail(error));
        });
    };
    
};