export const SET_USER = 'SET_USER';

export function setUser(user) {
  return { type: SET_USER, user }
};

export function updateUser(user) {
  return { type: UPDATE_USER, user }
};

export const user;