import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions  from '../actions';
import M from  'materialize-css/dist/js/materialize.min.js';


class Header extends Component{
    
    componentDidMount(){
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});  
    }

    renderContent(){
        switch (this.props.auth){

            case false:
                return (
                <div>
                    <Link to='/login' key='login' className='btn purple darken-3'>Login </Link>
                </div>
                );
            default:
                let retVal =
                    [
                        <li key='3'><a key='products' className='btn purple darken-3 hoverable' href ='/main/products'>Products</a></li>,
                        <li key='2'><a key='cart' className='btn purple darken-3 hoverable' href ='/cart'>Cart</a></li>,
                        <li key='5'><a key='about' className='btn purple darken-3 hoverable' href ='/about'>About</a></li>,
                        <li key='4'><a key='contact' className='btn purple darken-3 hoverable' href ='/contact'>Contact Us</a></li>,
                        <li key='6'><a key='logout' className='btn purple darken-3 hoverable' href ='/api/logout'>Logout</a></li>,
                    ];

                    
                    if(this.props.auth.local){
                        if(this.props.auth.local.isAdmin){
                            retVal.push(<li key='1'><a key='admin' className='btn purple darken-3 hoverable' href ='/admin'>Admin</a></li>);
                        }
                    }
                return (
                    <div> {retVal} </div>
                        
                    );
                            

        }
    };

   

    render(){
        return (
                <nav>
                     <div className="nav-wrapper purple">
                        <div className='container'>
                            <a href='#!' data-target='slide-out' className='sidenav-trigger show-on-md-and-down'><i className='material-icons left'>menu</i></a>
                        </div>
                        <div className='container'>
                            <Link to= {this.props.auth ? '/main/dash' : '/'} className="brand-logo" style={{margin:'auto'}}>EMS Creatures</Link>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                {this.renderContent()}
                            </ul>
                        </div>
                     </div>
                     <ul id='slide-out' className='sidenav purple'>
                        {this.renderContent()}
                    </ul>
                </nav>
                    
        );
    };
};

function mapStateToProps({ auth }) {

    return { auth };
}

export default connect(mapStateToProps, actions)(Header);