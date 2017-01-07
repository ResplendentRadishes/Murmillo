/*global describe, it*/

import { setUser, updateUser, setCode, requestCodeCheck, receiveCodeCheck } from '../client/src/actions/actions.js';
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
  describe('setCode', function() {
    it('should create a SET_CODE action', function() {
      var code = 'var tron = new Movie()';
      var action = setCode(code);
      expect(action.type).to.equal('SET_CODE');
      expect(action.code).to.equal(code);
    })
  })
  describe('requestCodeCheck', function() {
    it('should create a REQUEST_CODE_CHECK action', function() {
      var action = requestCodeCheck();
      expect(action.type).to.equal('REQUEST_CODE_CHECK');
    })
  })
  describe('receiveCodeCheck', function() {
    it('should create a RECEIVE_CODE_CHECK action', function() {
      var action = receiveCodeCheck();
      expect(action.type).to.equal('RECEIVE_CODE_CHECK');
    })
    it('should give the action the correct result property', function() {
      var action = receiveCodeCheck(true);
      expect(action.result).to.equal(true);
      action = receiveCodeCheck(false);
      expect(action.result).to.equal(false)
    })
  })
})

describe('reducer', function() {
  var initialState;

  before(function() {
    initialState = {user: {}, code: ''};
  })
  it('should record a new user in the state', function() {
    var action = {type: 'SET_USER', user: {name: 'jeff bridges'}};
    var newState = reducer(initialState, action);
    expect(newState.user.name).to.equal('jeff bridges');
  })
  it('should create a new object for the state, not pass a reference', function() {
    var action = {type: 'SET_USER', user: {name: 'jeff bridges'}};
    var newState = reducer(initialState, action);
    action.user.name = 'jeffrey lebowski';
    expect(newState.user.name).to.equal('jeff bridges');
  })
  it('should replace the stored code after a setCode action', function() {
    var code = 'tron.cycle()';
    var action = {type: 'SET_CODE', code};
    var newState = reducer(initialState, action);
    expect(newState.code).to.equal(code);
  })
})
