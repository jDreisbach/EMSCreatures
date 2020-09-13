import _ from 'lodash';
import React, { Component } from 'react';
import {reduxForm, Field } from 'redux-form';
import{ Link } from 'react-router-dom';
import FIELDS from './loginFields';
import LoginField from './LoginField'
import { connect } from 'react-redux';
import * as actions from '../../actions'

class LoginForm extends Component {
   
    renderFields(){
        return _.map(FIELDS, ({ label, name, type })=> {
           
            return <Field  className='purple-text' component={LoginField} key={name} type={type} label={label} name={name} />
        });
    };

    render(){
        const {invalid} = this.props
        
        return (
            <div className='valign-wrapper row login-box' style={{marginTop:'100px'}}>
                <div className='col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4'>
                    <form method='POST' action='/api/login'>
                         <div className = 'card-content'>
                             <span className='card-title purple-text' style={{textAlign:'center'}}>Login<a href='/register'> Not a member? sign up!</a></span>
                             <div className='center-align row'>
                                <li key='google' style={{marginLeft: '30px'}} className='col m6 center-align white-text darken-3'><a className='white-text' href='/auth/google'><img alt="" src="https://img.icons8.com/cute-clipart/64/000000/google-logo.png"/></a></li>
                                <li key='facebook' className='col  center-align white-text darken-3'><a className='white-text' href='/auth/facebook'><img alt = "" src="https://img.icons8.com/cute-clipart/64/000000/facebook-new.png"/></a></li>
                             </div>
                                <div className='row input-field col s12'>
                                 {this.renderFields()}
                                <Link to='/' className='purple btn-flat left white-text'>Back</Link>
                                <button disabled={invalid} type='submit' className='purple btn-flat right white-text'>Login
                                 <i className='material-icons right'>done</i>
                                </button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
};

function validate(values){
    const errors = {};

    _.each(FIELDS, ({name})=>{
        if(!values[name]){
            errors[name] = 'You must enter a value!'
        } 
    });
    return errors;
    
};

const form =  reduxForm({
    validate,
    form: 'LoginForm'
});


export default connect(null, actions)(form(LoginForm));