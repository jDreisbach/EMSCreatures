import React, {Component} from 'react';

class Admin extends Component{
    
    render(){
        return (
            <nav className='purple center-align'>
                <div className='row purple center-align'>
                    <div className='col s12 center-align purple'>
                        <ul className='tabs purple center-align'>
                            <li className='tab col s4'><a className='purple white-text' href='/admin/users'>Users</a></li>
                            <li className='tab col s4'><a className='purple white-text' href='/admin/products'>Products</a></li>
                            <li className='tab col s4'><a className='purple white-text' href='/admin/orders'>Orders</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    };
};

export default Admin;