import React, {Component} from 'react';
//import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Cart extends Component{
    componentDidMount(){
        this.props.fetchCart();
    }

     subTotal(){
        return this.props.cart.map(({ items, _id })=> {
            let subtotal=0;
            console.log(items)
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
                        <div key={_id} style={{marginLeft: '50px'}} className='card container'>
                                <div className='card-content'>
                                    <p className='purple-text flow-text'>SubTotal:  <span className='green-text'>${subtotal.toFixed(2)}</span></p>
                                    <p className='purple-text flow-text'>Shipping:  <span className='green-text'>${shipping.toFixed(2)}</span></p>
                                    <p className='purple-text flow-text'>Tax:  <span className='green-text'>${tax.toFixed(2)}</span></p>
                                    <h3 className='purple-text flow-text'>Total:  <span className='green-text'>${total.toFixed(2)}</span></h3>
                                </div>
                                <div className='row'>
                                    <div className='col pull s12'>
                                        <a href='/main/products' className='left hoverable btn purple white-text flow-text'>Back</a>
                                        <a href='/main/checkout' className='right pulse hoverable btn purple white-text flow-text'>Checkout</a>
                                    </div>  
                                </div>
                        </div>
            );
        });
    }

    renderCart(){
        return this.props.cart.map(({ items })=>{
          return items.map(({ product, _id, quantity })=>{
              return (
                  <form style={{marginTop:'50px'}} key={_id}>
                        <p className='left purple-text' style={{marginLeft:'25px'}}>{quantity}X</p>
                        <div className="card-image left">
                            <img style={{ height: '100px', maxWidth: '75px', borderRadius: '20%', marginLeft: '15px' }} alt={product.name} src={`data:image/apng;base64,${product.image}`}  />
                        </div> 
                        <h4 className='purple-text left' style={{marginLeft:'25px'}}><strong>{product.name}</strong></h4>
                        <div className='card-content'>
                            <a href={'/api/removefromcart/' +_id} className='right '><i className='material-icons small purple-text right center-align' style={{marginRight:'25px'}}>delete_forever</i></a>
                            <p className='green-text'><strong>${product.price.toFixed(2)}</strong></p> 
                        </div>
                  </form>
              )
          })
        })
    }

    render(){
        return(
            <div className='container valign-wrapper center-align' style={{marginTop: '100px'}}>
                <div className='card container'>
                    <h3 className='purple-text'>Shopping Cart</h3>
                    <hr />
                    {this.renderCart()}
                </div>
                {this.subTotal()}
            </div>
        );
    };
};

function mapStateToProps({ cart }) {

    return ({ cart });
};

export default connect(mapStateToProps, actions)(Cart);