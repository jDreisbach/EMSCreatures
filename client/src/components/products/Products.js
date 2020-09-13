import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Products extends Component{
    
        componentDidMount(){
            this.props.fetchProduct(); 
            this.props.fetchUser();
            this.props.addToCart();
        }
    
         renderProducts(){
            return this.props.product.map(({ _id, name, image, description, price })=> {
                return (
                    <div key={_id} >
                    <form method='POST' action={`/api/addtocart/` + _id}>
                        <div className="col s12 m4 l3 hoverable" >
                            <div className=" card medium center-align" >
                                    <div className="card-image ">
                                        <img style={{ maxHeight: '250px', maxWidth: '80%', borderRadius: '20%'}} className='activator center-align' alt={name} src={`data:image/apng;base64,${image}`}  />
                                    </div>
                                    <div className="card-content center-align">
                                        <span className='card-title purple-text activator'><strong>{name}</strong><i className='material-icons right'>more_vert</i></span>
                                        <button className="btn btn-floating waves-effect waves-light red right hoverable"><i className="material-icons">shopping_cart</i></button>
                                        <h5 className='purple-text'>Price:  <strong className='green-text'>${price.toFixed(2)}</strong></h5>
                                    </div>
                                    <div className='card-reveal'>
                                        <span className='card-title purple-text'><strong>{name}</strong><i className='material-icons right'>close</i></span>
                                        <p className='purple-text'>{description}</p>
                                        <h5 className='purple-text'>Price:  <strong className='green-text'>${price.toFixed(2)}</strong></h5>
                                        <button className="btn btn-floating waves-effect waves-light red right hoverable"><i className="material-icons">shopping_cart</i></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                );
            });
        }
    render(){
        return(
            <div className='center-align'>
            <h1 className='purple-text center-align' >Products</h1>
                <div className='container row section'>
                    <div>
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
        )
    }
    }
    
    function mapStateToProps({ product, users, auth }) {
       
        return ({ product, users, auth });
    };
    export default connect(mapStateToProps, actions)(Products);