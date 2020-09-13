import React from 'react';

export default ({ label, meta, type, input })=>{
    
    return(
        <div>
            <label className='purple-text'>{label}</label>
            <input {...input}  type={type} style= {{marginBottom: '5px'}} />
            <div className = "red-text" style={{ marginBottom: '20px'}}>
                {meta.touched && meta.error}
            </div>
        </div>
            
    );
};