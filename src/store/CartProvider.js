import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalItems = state.totalAmount + action.item.price * action.item.amount

        const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id)
        const existingItem = state.items[existingItemIndex]
        let updatedItems;

        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            }

            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalItems
        }
    }

    if (action.type === 'REMOVE') {

        const existingItemIndex = state.items.findIndex((item) => item.id === action.id)
        const existingItem = state.items[existingItemIndex]
        const amount = existingItem.amount
        const updatedAmount = amount - 1
        const updatedTotalItems = state.totalAmount - existingItem.price
        let updatedItems;

        if (updatedAmount) {
            const updatedItem = {
                ...existingItem,
                amount: updatedAmount
            }

            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem
        } else {
            updatedItems = state.items.filter((item) => item.id !== action.id)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalItems
        }
    }
    
    return defaultCartState
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item:item})
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id:id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;