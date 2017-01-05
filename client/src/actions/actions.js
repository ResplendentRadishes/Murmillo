export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_ROOM = 'SET_ROOM';

export function setUser(user) {
  return { type: SET_USER, user };
}

export function updateUser(user) {
  return { type: UPDATE_USER, user };
}

export function setRoom(room) {
  return { type: SET_ROOM, room }
}