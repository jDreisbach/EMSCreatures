import React, {Component} from 'react'

class CheckoutForm extends Component{
    render(){
        return (
            <div className='container section'>
                <form className='card'>
                    <div className='card-title purple'>
                        <h3 className='white-text center-align'>Shipping Information</h3>
                        <hr />
                    </div>
                    <div className='card-content section'>
                        <label className='purple-text flow-text' style={{marginTop:'15px'}}>First Name:</label>
                            <input type='text' name='firstName'/>
                        <label className='purple-text flow-text' style={{marginTop:'15px'}}>Last Name:</label>
                            <input type='text' name='lastName' />
                        <label className='purple-text flow-text' style={{marginTop:'15px'}}>Address:</label>
                            <input type='text' name='address' />
                        <label className='purple-text flow-text'style={{marginTop:'15px'}} >City:</label>
                            <input type='text' name='city'/>
                        <label className='purple-text flow-text' style={{marginTop:'15px'}}>State:</label>
                            <input type='text' name='state' />
                        <label className='purple-text flow-text' style={{marginTop:'15px'}}>Zip Code:</label>
                            <input type='text' name='zip'/>
                        <div className='section' style={{margin: '20px 60px 20px 60px'}}>
                            <a href= '/main/checkout' className='btn btn-primary purple white-text hoverable right large'>Next</a>
                            <a href= '/cart' className='btn btn-primary purple white-text hoverable left large pulse
                            '>Back</a>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
};

export default CheckoutForm