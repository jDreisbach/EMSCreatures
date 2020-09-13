import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Checkout extends Component{
    componentDidMount(){
        this.props.fetchCart();
    }

    subTotal(){
        return this.props.cart.map(({ items, _id })=> {
            let subtotal=0;
            items.forEach((item)=>{
                subtotal += item.product.price;
            });
                   
                let shipping=0;
                let tax=0;
                let total=0;
            
                    if(items.length === 0){
                        shipping=0;
                        tax = subtotal * .07;
                        total = tax + parseInt(subtotal) + shipping;
                    }else{
                        shipping = 10;
                        tax = subtotal * .07;
                        total = tax + parseInt(subtotal) + shipping;
                    }

                    return (
                        <div key={_id} className='container'>
                            <form method='POST' action='/api/pay'>
                            <div className='center-align card'>
                            <div className='card-content center-align'>
                                <p className='purple-text'>SubTotal:  <span className='green-text'>${subtotal.toFixed(2)}</span></p>
                                <p className='purple-text'>Shipping:  <span className='green-text'>${shipping.toFixed(2)}</span></p>
                                <p className='purple-text'>Tax:  <span className='green-text'>${tax.toFixed(2)}</span></p>
                                <hr/>
                                <div className='section'>
                                    <p className='purple-text'>Total:  <span className='green-text'>${total.toFixed(2)}</span></p>
                                </div>
                                <div className='section'>
                                    <button className='btn btn-primary right pulse hoverable white-text purple'>Purchase</button>
                                    <a href='/main/cart' className='btn btn-primary left hoverable white-text purple'>Back</a>
                                </div>
                                
                            </div>
                            <div id='success'></div>
                        </div>  
                    </form>
                </div>
                            
            );
        });
    }

    render(){
        return(
            <div>
                <h1>{this.subTotal()}</h1>
            </div>
        )
    }

}

function mapStateToProps({ cart }){
    return ({ cart });
};

export default connect(mapStateToProps, actions)(Checkout);