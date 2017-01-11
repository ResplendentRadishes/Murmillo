import { connect } from 'react-redux';
import { setCode, requestCodeCheck } from '../actions/actions.js';
import { socketEmitSubmission } from '../socketHandler.js';
import Editor from './editor.jsx';

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
      // emmit submission event to server
      socketEmitSubmission(params.room, params.problemId, params.user, params.code);
    },

  }
}

const CodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

export default CodeContainer;
