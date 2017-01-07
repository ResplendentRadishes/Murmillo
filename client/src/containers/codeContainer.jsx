import { connect } from 'react-redux';
import { setCode, requestCodeCheck, receiveCodeCheck} from '../actions/actions.js';
import {submitSoln} from '../socketHandler.js';
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
      dispatch(requestCodeCheck());
      submitSoln(params.room, params.problemId, params.user, params.code, function(result) {
        dispatch(receiveCodeCheck(result));
      });
    }

  }
}

const CodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

export default CodeContainer;
