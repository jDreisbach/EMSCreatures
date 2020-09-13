import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Users extends Component{

    componentDidMount(){
        this.props.fetchUsers(); 
    }

     renderUsers(){
        return this.props.users.map(({ _id, local, facebook, google })=> {
           
            return (
                <div key={_id} className='valign-wrapper row'>
                <div className = 'col s10 pull-s1 m6 pull-m3 l4 pull-l4 hoverable'>
                <div className='card center-align' style={{margin: '50px, 10px, 20px, 10px'}}>
                    <a href={'/api/users/delete/' + _id}className='right white '><i className='material-icons small purple-text right center-align'>delete_forever</i></a>
                    <div className='card-content'>
                        <span className='card-title purple-text'>{local.username}</span>
                        <span className='card-title purple-text'>User ID:  {_id}</span>
                        <p className='purple-text'>{local.email}</p>
                        <p className='purple-text'>Admin:  {local.isAdmin.toString()}</p> 
                        <p>
                        <label htmlFor={_id}>
                            <input id={_id} type="checkbox" />
                            <span className='red-text '>Make Admin?</span>
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
        <div>
            <h1 className='purple-text center-align'>Users</h1>
            {this.renderUsers()}
        </div>
    )
}
}

function mapStateToProps({ users }) {
   
    return ({ users });
};
export default connect(mapStateToProps, actions)(Users);