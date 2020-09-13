import React, { Component } from 'react';
// import * as actions from '../../actions';
// import { connect } from 'react-redux';

class CheckoutSuccess extends Component{
    // componentDidMount(){
    //     this.props.paymentSuccess();
    // }

    render(){
        return(
            <div className='center-align'>
                <h1 className='purple-text'>EMS Creatures</h1>
                <div className='card'>
                    <div className='card-content'>
                        <h3 className='green-text'>Your payment was Successful!</h3>
                        <br />
                        <h5 className='purple-text'>Each order is hand-crocheted specifically for you!</h5>
                        <h5 className='purple-text'>Please allow 5-7 days for your order to be made!</h5>
                        <h3 className='purple-text'>Thank You for your business!</h3>
                        <a href='/main/products' className='btn btn-primary purple white-text'>Continue Shopping!</a>
                    </div>
                </div>
            </div>
        );
    };
};

// function mapStateToProps({ order }){
//     return { order };
//}

export default CheckoutSuccess;