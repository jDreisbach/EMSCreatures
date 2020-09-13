import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class ProductsManager extends Component{
    
        componentDidMount(){
            this.props.fetchProduct(); 
        }
    
         renderProducts(){
            return this.props.product.map(({ _id, name, image, description, price })=> {
                return (
                    <div key={_id} >
                        <div className=" center-align">
                            <div className="col s12 m4 l3 hoverable" >
                                    <div className="card-image ">
                                        <img style={{ maxHeight: '200px', maxWidth: '150px', borderRadius: '20%'}} className='center-align' alt={name} src={`data:image/apng;base64,${image}`}  />
                                        <a href={'/api/products/delete/' + _id}className='right white '><i className='material-icons small purple-text right center-align'>delete_forever</i></a>
                                    </div>
                                    <div className="card-content right">
                                        <p>{name}</p>
                                        <p>{description}</p>
                                        <p>Price:  {price}</p>
                                        <p>
                                            <label htmlFor={_id}>
                                                <input id={_id} type="checkbox" />
                                                <span className='red-text '>Feature Item?</span>
                                            </label>
                                            </p>
                                    </div>
                                </div>
                            </div>
                    </div>
                );
            });
        }
    render(){
        return(
            <div className='container center-align section'>
            <h1 className='purple-text center-align' >Products</h1>
                <div className='card row'>
                    
                    {this.renderProducts()}
                </div>
            </div>
        )
    }
    }
    
    function mapStateToProps({ product }) {
       
        return ({ product });
    };
    export default connect(mapStateToProps, actions)(ProductsManager);