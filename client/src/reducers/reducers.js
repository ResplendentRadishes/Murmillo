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

function competition(state = {isFetching: false, solved: false}, action) {
  switch (action.type) {
    case 'REQUEST_CODE_CHECK':
      return {...state, isFetching: true};
    case 'RECEIVE_CODE_CHECK':
      return {...state, isFetching: true, solved: action.result};
    default:
      return state;
  }
}

const murmilloApp = combineReducers({
  user,
  room,
  code,
  competition
});

export default murmilloApp;
