import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json').then(res => {
            const fectchedOrders = [];
            for (let key in res.data) {
                fectchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fectchedOrders});
        })
        .catch(error => {
            this.setState({loading: false});
        });
    }
    render() {
        return (
            <div>
              {this.state.orders.map(order => {
                return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}/>
              })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);