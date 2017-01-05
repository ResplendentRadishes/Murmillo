export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_ROOM = 'SET_ROOM';
export const SET_CODE = 'SET_CODE';

//user actions
export function setUser(user) {
  return { type: SET_USER, user };
}

export function updateUser(user) {
  return { type: UPDATE_USER, user };
}

//room actions
export function setRoom(room) {
  return { type: SET_ROOM, room }
}

//code actions
export function setCode(code) {
  return { type: SET_CODE, code };
}
