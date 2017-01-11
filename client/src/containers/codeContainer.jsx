import { connect } from 'react-redux';
import { setCode, requestCodeCheck, receiveCodeCheck, getCompUpdate} from '../actions/actions.js';
import {socketSubmitSoln, socketCompUpdate} from '../socketHandler.js';
import Editor from '../components/editor.jsx';

const mapStateToProps = (state) => {
  return {
    code: state.code !== null ? state.code : state.problem.template,
    room: state.room,
    username: state.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCode: function(text) {
      dispatch(setCode(text));
    },
    submitCode: function(params) {
      // dispatch requestCodeCheck to set state: isFetching to true
      dispatch(requestCodeCheck());

      // dispatch receiveCodeCheck to set state: isFetching to false, status to result from socket conn
      socketSubmitSoln(params.room, params.problemId, params.user, params.code, function(result) {
        dispatch(receiveCodeCheck(result));
      });
    },
    getLiveUpdate: function(params) {
      // dispatch getCompUpdate to set state: compUpdate to update from socket conn
      socketCompUpdate(params.room, function(update) {
        dispatch(getCompUpdate(update));
      });
    }

  }
}

const CodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

export default CodeContainer;
