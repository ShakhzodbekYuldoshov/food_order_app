import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import { useRef, useState } from 'react'

const MealItemForm = props => {
    const [isValidInput, setIsValidInput] = useState(true)
    const amountRef = useRef();

    const addItemHandler = event => {
        event.preventDefault()

        const inputAmount = amountRef.current.value;
        const inputAmountNumber = +inputAmount;

        if (inputAmount.trim().length === 0 || inputAmountNumber < 0 || inputAmountNumber > 5) {
            setIsValidInput(false)
            return;
        }

        props.onAddToCart(inputAmountNumber)
    }

    return (
        <form className={classes.form}>
            <Input label='Amount' ref={amountRef} input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}/>
            <button onClick={addItemHandler} >+ Add</button>
            {!isValidInput && <p>Please enter valid number(1-5).</p>}
        </form>
    )
}

export default MealItemForm;