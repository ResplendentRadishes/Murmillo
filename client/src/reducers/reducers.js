import { combineReducers } from 'redux';

// const initialState = {
//   user: {}
// };

function user(state = {}, action) {
  switch (action.type) {

    case 'SET_USER':
      return { ...action.user };

    case 'UPDATE_USER':
      return { ...state, ...action.user };

    default:
      return state;
  }
};

function room(state = {}, action) {
  switch (action.type) {

    case 'SET_ROOM':
      return { ...action.room };

    case 'UPDATE_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, action.message]
      };

    default:
      return state;
  }
}

function roomList(state = [], action) {
  switch (action.type) {

    case 'SET_ROOMLIST':
      return Array.from(action.roomList);

    default:
      return state;
  }
}

function messages(state = [], action) {
  switch (action.type) {

    case 'RESET_MESSAGES':
      return [];

    default:
      return state;
  }
}

function problem(state = {}, action) {
  switch (action.type) {

    case 'SET_PROBLEM':
      return { ...state, ...action.problem };

    default:
      return state;
  }
}

function code(state = null, action) {
  switch (action.type) {

    case 'SET_CODE':
      return action.code;

    case 'SET_ROOM':
      return null;

    default:
      return state;
  }
}

const defaultMsg = 'No other users have submitted code yet';
function competition(state = {isFetching: false, status: 'In Progress', compUpdate: defaultMsg}, action) {
  switch (action.type) {
    case 'REQUEST_CODE_CHECK':
      return {...state, isFetching: true};
    case 'RECEIVE_CODE_CHECK':
      return {...state, isFetching: false, status: action.result};
    case 'GET_COMP_UPDATE':
      return {...state, compUpdate: action.compUpdate};
    default:
      return state;
  }
}

// ==============================================
// combine reducers from above
const rootReducer = combineReducers({
  user,
  roomList,
  room,
  messages,
  problem,
  code,
  competition
});

// ==============================================
// reset all states to undefined upon logout
const murmilloApp = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return rootReducer(state, action);
}

export default murmilloApp;
