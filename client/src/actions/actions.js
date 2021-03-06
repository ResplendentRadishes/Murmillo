export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_USER_STAT = 'SET_USER_STAT';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_ROOM = 'SET_ROOM';
export const SET_ROOMLIST = 'SET_ROOMLIST';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const UPDATE_PLAYERLIST = 'UPDATE_PLAYERLIST';
export const SET_PROBLEM = 'SET_PROBLEM';
export const RESET_PROBLEM = 'RESET_PROBLEM';
export const SET_CODE = 'SET_CODE';
export const RESET_COMP = 'RESET_COMP';
export const REQUEST_CODE_CHECK = 'REQUEST_CODE_CHECK';
export const RECEIVE_CODE_CHECK = 'RECEIVE_CODE_CHECK';
export const GET_COMP_UPDATE = 'GET_COMP_UPDATE';
export const UPDATE_COMP_OUTOFTIME = 'UPDATE_COMP_OUTOFTIME';

// =========================================
//user actions
export function setUser(user) {
  return { type: SET_USER, user };
}

export function updateUser(user) {
  return { type: UPDATE_USER, user };
}

export function setUserStat(userStat) {
  return { type: SET_USER_STAT, userStat };
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

// =========================================
//editor actions
export function setProblem(problem) {
  return {type: SET_PROBLEM, problem };
}

export function resetProblem() {
  return {type: RESET_PROBLEM };
}

// =========================================
//code actions
export function setCode(code) {
  return { type: SET_CODE, code };
}

// =========================================
//competition action
export function resetCompetition() {
  return {type: RESET_COMP};
}

export function requestCodeCheck() {
  return {type: REQUEST_CODE_CHECK};
}

export function receiveCodeCheck(resultObj) {
  return {type: RECEIVE_CODE_CHECK, resultObj}
}

export function getCompUpdate(compUpdate) {
  return {type: GET_COMP_UPDATE, compUpdate}
}

export function updateCompOutOfTime(outOfTime) {
  return {type: UPDATE_COMP_OUTOFTIME, outOfTime}
}

