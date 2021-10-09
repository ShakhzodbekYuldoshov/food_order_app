import { useContext } from 'react';
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context';

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const cartItemAddHandler = item => {
        const newItem = {
            ...item,
            amount: 1
        }
        cartCtx.addItem(newItem);
    };
    
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => 
                <CartItem 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    summary={item.summary}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                />)}
        </ul>)

    const ctxItemsLength = cartCtx.items.length > 0;
    const totalAmount = cartCtx.totalAmount.toFixed(2);

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{ totalAmount }</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--all']} onClick={props.onClose}>Close</button>
                { ctxItemsLength && <button className={classes.button}>Order</button> }
            </div>
        </Modal>
    )
}

export default Cart;