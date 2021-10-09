import classes from './MealsSummary.module.css'

const MealsSummary = props => {
    return (
        <section className={classes.summary}>
            <h2>
                Delicious Food, Delivered to you!
            </h2>
            <p>
                Choose your favoruite meal from our board selection of available meals and enjoy a delicious lunch or dinner at home.
            </p>
            <p>
                All your meals are cooked with high quality ingredients, just-in-time and of course by experienced chiefs!
            </p>
        </section>
    )
}

export default MealsSummary