'use strict';
import { setUser, updateUser } from '../client/src/actions/actions.js';
var expect = require('chai').expect;

describe('actions', function() {
  describe('setUser', function() {
    it('should create an action', function() {
      var action = setUser({name: 'jeff bridges'});
      //should create {type: SET_USER, user: {name: 'jeff bridges'}}
      expect(action.type).to.equal('SET_USER');
      expect(action.user.name).to.equal('jeff bridges');
    });
  });
  describe('updateUser', function() {
    it('should update the user', function() {
      var action = setUser({name: 'jeff bridges'});
      action = updateUser({score: 0});
      expect(action.type).to.equal('UPDATE_USER');
      expect(action.user.score).to.equal(0);
    });
    // it('should not alter non-specified properties', function() {
    //   expect(action.user.name).to.equal('jeff bridges');
    // });
    it('should overwrite data if given the same property', function() {
      var action = updateUser({score: 20});
      expect(action.user.score).to.equal(20);
    });
  });
});
