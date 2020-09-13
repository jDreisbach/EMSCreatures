import React, {Component} from 'react';

class Contact extends Component{
    render(){
        return (
            <div className='center-align'>
                <p>You can contact for a variety of reasons:</p>
                <ul>
                    <li>Custom Requests</li>
                    <li>Questions about colors and sizes</li>
                    <li>Inqueries on patterns</li>
                </ul>
                <p>To contact Em via <a href="mailto:emscrafts@jondreisbach.com">Email</a></p>
            </div>
        )
    }
}

export default Contact;