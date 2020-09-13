import React, { Component } from 'react';

class AdminProducts extends Component{
   render(){
       return (

        <nav className='purple center-align'>
        <div className='row purple center-align'>
            <div className='col s12 center-align purple'>
                <ul className='tabs purple center-align'>
                    <li className='tab col s6'><a className='purple white-text' href='/admin/products/createproduct'>Create Products</a></li>
                    <li className='tab col s6'><a className='purple white-text' href='/admin/products/productmanager'>Manage Products</a></li>
                </ul>
            </div>
        </div>
    </nav>

       );
   };
};

export default AdminProducts