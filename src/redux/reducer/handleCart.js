import {ADD_ITEM, INCREMENT, DECREMENT} from '../action/actionCreator'

export const cart = {
    cartItem: []
}

export const handleCart = (state = cart, action) => {
    switch (action.type) {
        case INCREMENT:
            const add = state.cartItem.find((x) => x.id === action.payload)
            let newCartItem
            if(add) {
                newCartItem = state.cartItem.map((x) => x.id === add.id ? { ...add, qty: add.qty + 1 } : x)
            }
            return {
                ...state,
                cartItem: newCartItem
            }
            break;

            case DECREMENT:
                const reduce = state.cartItem.find((x) => x.id === action.payload)
                let reducedCartItem
                if(reduce) {
                    reducedCartItem = state.cartItem.map((x) => x.id === reduce.id ? { ...reduce, qty: reduce.qty - 1 } : x)
                }
                return {
                    ...state,
                    cartItem: reducedCartItem
                }
                break;

        case ADD_ITEM:
            const item = action.payload
            // const exist = state.cartItem.item.find((x)=> x.id === item.id)
            const exist = state.cartItem.find((x) => x.id === item.id)
            let newCartItems
            if (exist) {
                newCartItems = state.cartItem.map((x) => x.id === exist.id ? { ...exist, qty: exist.qty + 1 } : x)
            } else {
                newCartItems = [...state.cartItem, { ...item, qty: 1 }]
            }
            return {
                ...state,
                cartItem: newCartItems
            }
            break;

        default:
            return state;
            break;
    }
}

// export default handleCart