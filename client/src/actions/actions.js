export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_ROOM = 'SET_ROOM';
export const SET_ROOMLIST = 'SET_ROOMLIST';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const SET_CODE = 'SET_CODE';
export const REQUEST_CODE_CHECK = 'REQUEST_CODE_CHECK';
export const RECEIVE_CODE_CHECK = 'RECEIVE_CODE_CHECK';

//user actions
export function setUser(user) {
  return { type: SET_USER, user };
}

export function updateUser(user) {
  return { type: UPDATE_USER, user };
}

//roomList actions
export function setRoomList(roomList) {
  return {type: SET_ROOMLIST, roomList }
}

//room actions
export function setRoom(room) {
  return { type: SET_ROOM, room };
}

export function updateMessages(message) {
  return { type: UPDATE_MESSAGES, message };
}

//code actions
export function setCode(code) {
  return { type: SET_CODE, code };
}

export function requestCodeCheck() {
  return {type: REQUEST_CODE_CHECK};
}

export function receiveCodeCheck(result) {
  return {type: RECEIVE_CODE_CHECK, result} //result is true or false
}
