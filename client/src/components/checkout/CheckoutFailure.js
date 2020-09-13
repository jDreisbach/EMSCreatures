import React, { Component } from 'react';

class CheckoutFailure extends Component{
    render(){
        return(
            <div className='center-align'>
                <h1 className='purple-text'>EMS Creatures</h1>
                <div className='card'>
                    <div className='card-content'>
                        <h3 className='red-text'>Your payment was NOT successful!</h3>
                        <br />
                        <h5 className='purple-text'>Please check your funds and try again!</h5>
                        <h3 className='purple-text'>We appreciate your business!</h3>
                        <a href='/cart' className='btn btn-primary purple white-text'>Try Again!</a>
                    </div>
                </div>
            </div>
        );
    };
};

export default CheckoutFailure;