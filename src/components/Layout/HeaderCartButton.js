import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const [shouldBump, setShouldBump] = useState(false)
    const btnClasses = `${classes.button} ${shouldBump ? classes.bump : ''}`

    const cartItems = cartCtx.items

    const numOfCartItems = cartItems.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    useEffect(() => {
        if (cartItems.length === 0) {
            return;
        }

        setShouldBump(true)

        const timer = setTimeout(() => {
            setShouldBump(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }

    }, [cartItems])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            
            <span>Your Cart</span>
            <span className={classes.badge}>{numOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;