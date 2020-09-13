import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';


 class Card extends Component{
    componentDidMount(){
        this.props.fetchProduct();
    };

    render(){
        return this.props.product.map(({ _id, name, image, description, price, isFeatured })=>{

    return(
        <div className='col' key={_id}>
              <a  href="#one!">
                <img src= {`data:image/apng;base64, ${image}`} alt={name} />
                <p>{description}</p>
                <p>${price}</p>
              </a>
        </div> 
 
    )
    }
    )
}}

function mapStateToProps({ product }) {
       
    return ({ product });
};
export default connect(mapStateToProps, actions)(Card);