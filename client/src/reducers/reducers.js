import { combineReducers } from 'redux';

const initialState = {
  user: {}
};

function user(state = {}, action) {
  switch (action.type) {

    case 'SET_USER':
      return action.user;

    case 'UPDATE_USER':
      return { ...state, ...action.user };

    default:
      return state;
  }
};

const murmilloApp = combineReducers({
  user
});

export default murmilloApp;
