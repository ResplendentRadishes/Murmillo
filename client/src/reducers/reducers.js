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

function room(state = {}, action) {
  switch (action.type) {

    case 'SET_ROOM':
      return action.room;

    default:
      return state;
  }
}

function code(state = '', action) {
  switch (action.type) {

    case 'SET_CODE':
      return action.code;

    default:
      return state;
  }
}

const murmilloApp = combineReducers({
  user,
  room,
  code

});

export default murmilloApp;
