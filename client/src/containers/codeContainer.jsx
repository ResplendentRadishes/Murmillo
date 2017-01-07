import { connect } from 'react-redux';
import { setCode, requestCodeCheck, receiveCodeCheck} from '../actions/actions.js';
import {submitSoln} from '../socketHandler.js';
import Editor from '../components/editor.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    code: state.code || ownProps.code,
    roomname: 'todo',
    problemID: 'todo',
    username: state.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCode: function(text) {
      dispatch(setCode(text));
    },
    submitCode: function(code) {
      dispatch(requestCodeCheck());
      submitSoln('hard', 1, 'Vernon', code, function(result) {
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
