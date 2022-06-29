//for Adding Item to Cart
import { ADD_ITEM, INCREMENT, DECREMENT } from "./actionCreator"

export const addCart = (payload) => {
    return {
        type: ADD_ITEM, 
        payload
    }
}

//for Deleting Item from Cart
export const delCart = (product) => {
    return {
        type: "DEL_ITEM", 
        payload: product
    }
}

export const incItem =(payload) => {
    return {
        type:INCREMENT,
        payload
    }
}

export const decItem =(payload) => {
    return {
        type:DECREMENT,
        payload
    }
}


