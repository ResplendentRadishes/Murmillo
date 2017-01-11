import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions/actions.js'
import { hashHistory } from 'react-router';

let signUp = ({dispatch}) => {
  let input;

  return(
    <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(setUser({username: input.value}));
        input.value = '';
        hashHistory.push('/dashboard');
    }}>
      <h2 className='text-center'>Select Username</h2>
      <div className='input-group col-md-4 col-md-offset-4'>
        <input className='form-control' ref={node => {input = node}} />
        <span className='input-group-btn'>
          <button className='btn btn-default' type="sumbit">Save</button>
        </span>
      </div>
    </form>
  );
}

signUp = connect()(signUp);

export default signUp;
