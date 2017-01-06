import { connect } from 'react-redux';
import { setCode, requestCodeCheck} from '../actions/actions.js';
import {submitSoln} from '../socketHandler.js';
import Editor from '../components/editor.jsx';

const mapStateToProps = (state) => {
  return {
    code: state.code
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCode: function(text) {
      dispatch(setCode(text));
    },
    submitCode: function(code) {
      dispatch(requestCodeCheck());
      submitSoln('hard', 1, 'Vernon', code);
    }
  }
}

const CodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

export default CodeContainer;
