import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        axios.get('/ingredientsjson')
        .then(response => {
            this.setState({ingredients: response.data});
        });
    }

    updatedPurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {//state objects are immutable
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({totalPrice: newTotalPrice, ingredients: updatedIngredients});
        this.updatedPurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {//state objects are immutable
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({totalPrice: newTotalPrice, ingredients: updatedIngredients});
        this.updatedPurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,//always calculate total price on server side bc user might manipulate it
            customer: {
                name: 'Vishal Joshi',
                address: {
                    street: 'test treeet',
                    zipcode: 'nff234',
                    country: 'Canada'
                },
                email: 'test@best.com',
            },
            deliveryMethod: 'fastest'
        };
        
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            this.setState({loading: false, purchasing: false});
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;

        let burger = <Spinner />
        if(this.state.ingredients) {
            burger = (
                <Aux> 
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice}/>
        }
        
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
   
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);