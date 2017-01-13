export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_ROOM = 'SET_ROOM';
export const SET_ROOMLIST = 'SET_ROOMLIST';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const UPDATE_PLAYERLIST = 'UPDATE_PLAYERLIST';
export const SET_PROBLEM = 'SET_PROBLEM';
export const SET_CODE = 'SET_CODE';
export const REQUEST_CODE_CHECK = 'REQUEST_CODE_CHECK';
export const RECEIVE_CODE_CHECK = 'RECEIVE_CODE_CHECK';
export const GET_COMP_UPDATE = 'GET_COMP_UPDATE';

// =========================================
//user actions
export function setUser(user) {
  return { type: SET_USER, user };
}

export function updateUser(user) {
  return { type: UPDATE_USER, user };
}

export function userLogout(user) {
  return { type: USER_LOGOUT };
}

// =========================================
//roomList actions
export function setRoomList(roomList) {
  return {type: SET_ROOMLIST, roomList }
}

// =========================================
//room actions
export function setRoom(room) {
  return { type: SET_ROOM, room };
}

export function updateMessages(message) {
  return { type: UPDATE_MESSAGES, message };
}

export function updatePlayerList(playerList) {
  return { type: UPDATE_PLAYERLIST, playerList };
}

//editor actions
export function setProblem(problem) {
  return {type: SET_PROBLEM, problem };
}

// =========================================
//code actions
export function setCode(code) {
  return { type: SET_CODE, code };
}

export function requestCodeCheck() {
  return {type: REQUEST_CODE_CHECK};
}

export function receiveCodeCheck(result) {
  return {type: RECEIVE_CODE_CHECK, result}
}

export function getCompUpdate(compUpdate) {
  return {type: GET_COMP_UPDATE, compUpdate}
}

