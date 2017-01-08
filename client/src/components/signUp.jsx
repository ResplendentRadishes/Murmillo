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
        hashHistory.push('/');
    }}>
      <input ref={node => {
        input = node;
      }} />
    <button type="sumbit">Save</button>
    </form>
  );
}

signUp = connect()(signUp);

export default signUp;
