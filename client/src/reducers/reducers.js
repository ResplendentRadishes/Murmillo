// import { setUser } from '../actions/actions.js';
import { combineReducers } from 'redux';

const initialState = {
  user: {}
};




function user(state = {}, action) {

  switch (action.type) {

    case 'SET_USER':
      return action.user;
    case 'UPDATE_USER':
      return { ...state, ...action.user }
    default:
      return state
  }
}

// function murmilloApp(state = {}, action) {
//   return  {
//     user: user(state.user, action)
//   }
// }

const murmilloApp = combineReducers({
  user
})

export default murmilloApp;