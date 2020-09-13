import _ from 'lodash';
import React  from 'react';
import { connect } from 'react-redux';
import FIELDS from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';




const RegistrationFormReview = ({ onCancel, formValues, submitRegistration, history })=>{

    const reviewFields = _.map(FIELDS, field => {
        return (
            <div key={field.name}>
                <label className='purple-text'>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        );
    });


    return (
    <div>
        <div className='valign-wrapper row login-box' style={{marginTop:'100px'}}>
            <div className='col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4'>
                <form method='POST' action='/api/register'>
                <div className = 'card-content'>
                    <span className='card-title purple-text' style={{textAlign:'center'}}>Please Review Your Entries</span>
                    <div className='row input-field col s12'>
                        {reviewFields}
                        <button className="purple darken-2 btn white-text" onClick = { onCancel }>
                        Back
                        </button>
                        <button onClick={()=>submitRegistration(formValues, history)} className="purple btn darken-2 right white-text">Sign up!</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
    );
};


function mapStateToProps(state){
    return {
       formValues: state.form.registrationForm.values
    };
};

export default connect(mapStateToProps, actions)(withRouter(RegistrationFormReview));
