import { connect } from 'react-redux';
import { setCode, sendCode } from '../actions/actions.js';
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
    submitCode: function() {
      dispatch(sendCode());
    }
  }
}

const CodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

export default CodeContainer;
