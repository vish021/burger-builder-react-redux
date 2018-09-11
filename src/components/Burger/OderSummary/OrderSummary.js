import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component  {
    //This can be a stateless component and doesn't have to be a class

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
            <li key={igKey}>
                <span style={ {textTransform: 'capitalize'} }>{igKey}</span> : {this.props.ingredients[igKey]}
            </li>);
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burder with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;