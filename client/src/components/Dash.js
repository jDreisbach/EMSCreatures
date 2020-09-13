import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Dash extends Component{
    componentDidMount(){
        this.props.fetchUserOrder();
    }

    renderOrders(){
        console.log(this.props.userOrder)
        return this.props.userOrder.map(({ items, _id, purchase_units, orderInfo })=>{
            console.log('items: ',  items)
            console.log('id: ', _id)
            console.log('purchase_units: ', purchase_units.amount)
            return items.map((item)=>{
                return item.product.map((product)=>{
                    console.log('product: ', product.product.name)
                    return(
                        <div key={product.product._id} className='container'>
                            <form method='POST' action={`/api/addtocart/` + product.product._id}>
                                <div className='card center-align'>
                                    <div className='card-title'>
                                        <h3 className='purple white-text'>{orderInfo.orderDate}</h3>
                                    </div>
                                    <div className='card-content'>
                                        <h5 className='green-text left'>{purchase_units.amount.status}</h5>
                                        <img style={{ height: '100px', maxWidth: '75px', borderRadius: '20%', marginLeft: '15px' }} alt={product.product.name} src={`data:image/apng;base64,${product.product.image}`}  />
                                        <button className='purple white-text right btn btn-primary hoverable'>Buy Again!</button>
                                        <h4 className='purple-text'>{product.product.name}</h4>
                                    </div>
                                </div>
                            </form>    
                        </div>
                    );
                });
            });
        });
    };

    render(){
        return(
            <div className='center-align'>
                <h1 className='purple-text'>My Orders</h1>
                <hr />
                <div>
                    {this.renderOrders()}
                </div> 
            </div>
        );
    };
};
 
function mapStateToProps({ userOrder }){
    return ({ userOrder });
}

export default connect(mapStateToProps, actions)(Dash);