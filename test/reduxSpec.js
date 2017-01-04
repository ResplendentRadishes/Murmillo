/*global describe, it*/

import { setUser, updateUser } from '../client/src/actions/actions.js';
import reducer from '../client/src/reducers/reducers.js';
var expect = require('chai').expect;

describe('actions', function() {
  describe('setUser', function() {
    it('should create a SET_USER action', function() {
      var action = setUser({name: 'jeff bridges'});
      //should create {type: SET_USER, user: {name: 'jeff bridges'}}
      expect(action.type).to.equal('SET_USER');
      expect(action.user.name).to.equal('jeff bridges');
    })
  })
  describe('updateUser', function() {
    it('should create a UPDATE_USER action', function() {
      var action = updateUser({score: 0});
      expect(action.type).to.equal('UPDATE_USER');
      expect(action.user.score).to.equal(0);
    })
  })
})

describe('reducer', function() {
  it('should record a new user in the state', function() {
    var action = {type: 'SET_USER', user: {name: 'jeff bridges'}};
    var state = {user: {}};
    expect(reducer(state, action).user.name).to.equal('jeff bridges');
  })
})
