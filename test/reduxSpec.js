'use strict';
import {setUser} from '../client/src/actions/actions.js';
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
});
