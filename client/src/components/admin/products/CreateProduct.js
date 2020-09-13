import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';

class CreateProduct extends Component{
    // componentDidMount(){
    //     this.props.createProduct();
    // };

    renderProducts(){
        return(
            <div >
                <h1 className='purple-text center-align'>Create a New Product</h1>
                <form className='container valign-wrapper' method='POST' action='/api/admin/products' encType='multipart/form-data'>
                    <div className="row">
                    <div className="col s6 m12">
                        <div className="card center-align">
                            <div className="card-image">
                                <input type = "file" className='purple-text' name='image'/>
                                    <button type='submit' className="btn-floating waves-effect waves-light red hoverable"><i className="material-icons">add</i></button>
                            </div>
                            <div className="card-content">
                                <p className='purple-text'>Name:  <input type='text' name='name'></input></p>
                                <p className='purple-text'>Description<input type='text' name='description'></input></p>
                                <p className='purple-text'>Price:  <input type='text' name='price'></input></p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        );
    };

    render(){
        return(
            <div>
                {this.renderProducts()}
            </div>
        );
    }
};

export default reduxForm({form: 'createProduct', actions})(CreateProduct);
