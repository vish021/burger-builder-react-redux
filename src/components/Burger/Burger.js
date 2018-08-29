import React from 'react';
import classes from './Burger.css';
import BurgerIngredinets from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredinets key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);//flatten the array
    
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients!</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredinets type="bread-top" />
            {transformedIngredients}
            <BurgerIngredinets type="bread-bottom" />
        </div>
    );
};

export default burger;