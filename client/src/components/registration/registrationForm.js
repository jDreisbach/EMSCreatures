import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RegistrationField from './RegistrationField';
import { Link } from 'react-router-dom'
import validateEmails from '../../utils/validateEmails'
import FIELDS from './formFields';


class RegistrationForm extends Component {


    renderFields(){
        return _.map(FIELDS, ({ type, label, name }) => {
            return <Field key={name}  component = {RegistrationField} type={type} label={label} name={name} />
        });
    };

    handleSubmit(e){
        e.preventDefault();
        this.validate();
    }

    render(){

        const {invalid} = this.props;

         return(
            <div className='valign-wrapper row login-box' style={{marginTop:'100px'}}>
             <div className='col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4'>
                <form onsubmit={this.handleSubmit} method='POST' action='/api/register'>
                     <div className = 'card-content'>
                         <span className='card-title purple-text' style={{textAlign:'center'}}>Sign up!<Link to='/login'> Already a member? Log in!</Link></span>
                        <div className='row input-field col s12'>
                             {this.renderFields()}
                            <Link to='/login' className='purple btn-flat left white-text'>Back</Link>
                            <button disabled={invalid} className='purple btn-flat right white-text'>Next
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
function validatePasswords(password, confirmPassword){
    if(password === confirmPassword){
        return;
    }else{
        return 'Passwords do not match!'
    }

    
};

function validate(values){
    const errors = {};

        errors.email = validateEmails(values.email || '');
        errors.confirmPassword = validatePasswords(values.password, values.confirmPassword || '');

        _.each(FIELDS, ({name})=>{
            if(!values[name]){
                errors[name]='This field must not be blank';
            }
        });

        if(errors){
        return errors;
        } else{
            return {
                method: 'post',
                action: '/api/register'

            }
        }



};

export default reduxForm({
    validate,
    form: 'registrationForm',
    destroyOnUnmount: false
})(RegistrationForm);