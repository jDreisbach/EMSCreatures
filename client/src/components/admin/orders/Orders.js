import React, { Component } from 'react'
import * as actions from '../../../actions';
import { connect } from 'react-redux';

class OrderList extends Component {
    componentDidMount(){
        this.props.fetchOrders();
    };

    renderOrders(){
        return this.props.order.map(({ items, orderInfo, purchase_units, shipping, user, _id })=>{
            return(
                <div key={_id} className='container center-align'>
                    <div className='card hoverable'>
                        <div className='card-title purple'>
                            <h5 className='purple white-text right'>{orderInfo.orderId}</h5>
                            <h5 className='purple white-text left'>{orderInfo.orderDate}</h5><br />
                        </div>
                        <br/>
                        <div className='card-content'>
                            <h6 className='purple-text'>Customer Details:</h6><br />
                            <p className='purple-text'>{orderInfo.payer.name.given_name + ' ' + orderInfo.payer.name.surname}</p>
                            <p className='purple-text'>{orderInfo.payer.email}</p><br />

                            <h6 className='purple-text left'>Shipping Details:</h6><br /><br />
                            <p className='purple-text left'>{shipping.name.full_name}</p><br />
                            <p className='purple-text left'>{shipping.address.address_line_1}</p><br />
                            <p className='purple-text left'>{shipping.address.admin_area_2 + ', ' + shipping.address.admin_area_1}</p><br />
                            <p className='purple-text left'>{shipping.address.postal_code}</p><br />
                            <p className='purple-text left'>{shipping.address.country_code}</p><br />

                            <h6 className='purple-text'>Item Detail: </h6><br />
                            
                            {items.map((item)=>{
                                return item.product.map((product)=>{
                                    return(
                                        <div key={product.product._id}>
                                            <p className='purple-text'>{product.product.name}<span className='green-text right'>${product.product.price.toFixed(2)}</span></p>
                                            <br />
                                        </div>
                                    );
                                });
                            })}

                            <p className='purple-text right'>Subtotal:<span className='green-text'>{'  $' + purchase_units.amount.subtotal}</span></p><br />
                            <p className='purple-text right'>Shipping:<span className='green-text'>{'  $' + purchase_units.amount.shipping}</span></p><br />
                            <p className='purple-text right'>Tax:<span className='green-text'>{'  $' + purchase_units.amount.tax}</span></p><br />
                            <h6 className='purple-text right'>Total:<span className='green-text'>{'  $' + purchase_units.amount.total}</span></h6><br />
                        </div>
                    
                    </div>
                    
                </div>
            );
        });
    };

    render(){
        console.log(this.props.order)
        return(
            <div>
                {this.renderOrders()}
            </div>
        );
    };
};

function mapStateToProps({ order }){
    return ({ order });
};

export default connect(mapStateToProps, actions)(OrderList);