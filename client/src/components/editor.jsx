import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/chrome';


class Editor extends React.Component {
  constructor(props) {
    super(props);
  };

render() {
return (
  <div>
    <AceEditor
      mode="javascript"
      theme="chrome"
      name="code"
      width="100%"
      minLines={3}
      maxLines={50}
      ref="ace"
      fontSize={18}
      value={this.props.code}
      editorProps={{$blockScrolling: Infinity}}
      onChange={this.props.updateCode}
      onLoad={(editor) => {
        editor.focus();
        editor.getSession().setUseWrapMode(true);
      }}/>

    <button
      className="btn btn-info"
      type="button"
      onClick={this.props.submitCode}
    >
      Submit
    </button>
  </div>
);
};
};


export default Editor;
