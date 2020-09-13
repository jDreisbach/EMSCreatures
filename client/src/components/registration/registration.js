import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import RegistrationForm from './registrationForm';
import RegistrationFormReview from './RegistrationFormReview';
import * as actions  from '../../actions'

class Registration extends Component {
    state = { showRegistrationFormReview: false};

    renderContent() {
        if (this.state.showFormReview === true){
            return <RegistrationFormReview onCancel={ ()=>this.setState({ showFormReview: false})}/>;
        } else {
            return <RegistrationForm onRegistrationSubmit={()=> this.setState({ showFormReview: true})}/>;
        }
    };

    render(){
         return(
             <div>
                 {this.renderContent()}
             </div>
    );
  };
}


export default reduxForm({form: 'registrationForm', actions})(Registration);