import React from 'react';

export default ({ type, input, label, meta })=>{
    
    return (
        <div>
            <label className='purple-text'>{label}</label>
            <input type={type} {...input} style = {{marginBottom: '5px'}}/>
            <div className ="red-text" style = {{ marginBottom: '20px'}}>
                {meta.touched && meta.error}
            </div>
        </div>
    );
};