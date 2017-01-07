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
      <div className="panel panel-default">
        <div className="panel-heading">
          Your Solution:
        </div>
        <AceEditor
          mode="javascript"
          theme="chrome"
          name="code"
          width="100%"
          minLines={40}
          maxLines={40}
          tabSize={2}
          useSoftTabs={true}
          ref="ace"
          fontSize={12}
          value={this.props.code}
          editorProps={{$blockScrolling: Infinity}}
          onChange={this.props.updateCode}
          onLoad={(editor) => {
            editor.focus();
            editor.getSession().setUseWrapMode(true);
          }}/>
        <div className="panel-footer text-right clearfix">
          <button
            className="btn btn-info"
            type="button"
          >
            Run
          </button>
          <button
            className="btn btn-success"
            type="button"
            onClick={() => {this.props.submitCode(this.props.code)}}
          >
            Submit
          </button>
        </div>
      </div>
    );
  };
};


export default Editor;
