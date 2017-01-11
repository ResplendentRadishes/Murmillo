import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/chrome';

// ===============================================
// CSS Stylying
const aceStyle = {
  margin: '0px'
};
const consoleStyle = {
  height: '150px'
};
const panelStyle = {
  padding: '0px'
};
const iframeStyle = {
  height: '100%',
  width: '100px',
  border: 'none'
};
// ===============================================
// consoleCode using sandboxed i-frame
// reference: https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
const consoleCode = function (code) {
  var frame = document.getElementById('sandboxed');
  frame.contentWindow.postMessage(code, '*');
};
// ===============================================

class Editor extends React.Component {
  constructor(props) {
    super(props);
  };

  // setup listener for 'compUpdate'
  componentDidMount() {
    var params = {
      room: this.props.room.name,
    }

    this.props.getLiveUpdate(params);
  };

  render() {
    return (
      <div>

        {/* ------ AceEditor ------ */}
        <div className="panel panel-default editor" style={aceStyle}>
          <div className="panel-heading">
            Your Solution:
          </div>
          <AceEditor
            mode="javascript"
            theme="chrome"
            name="code"
            width="100%"
            height="300px"
            tabSize={2}
            useSoftTabs={true}
            ref="ace"
            fontSize={16}
            value={this.props.code}
            editorProps={{$blockScrolling: Infinity}}
            onChange={this.props.updateCode}
            onLoad={(editor) => {
              editor.focus();
              editor.getSession().setUseWrapMode(true);
            }}/>
          <div className="panel-footer text-right clearfix ">
            <button
              className="btn btn-info runbtn"
              type="button"
              onClick={() => {
                var code = this.props.code;
                consoleCode(code);
              }}
            >Run</button>
            <button
              className="btn btn-success successbtn"
              type="button"
              onClick={() => {
                var params = {
                  room: this.props.room.name,
                  problemId: this.props.room.problemId,
                  user: this.props.username,
                  code: this.props.code,
                }
                this.props.submitCode(params)}}
            >Submit</button>
          </div>
        </div>

        {/* ------ Console ------ */}
        {/* note: using sandboxed iframe to evaluate user's JS code */}
        <div className="panel panel-default submissionResultsPanel"
              style={consoleStyle}>
          <div className="panel-heading">
          </div>
          <div className="panel-body" style={panelStyle}>
            <iframe sandbox="allow-scripts"
                    id='sandboxed'
                    src="iframeEvalCode.html"
                    style={iframeStyle}></iframe>
          </div>
        </div>

      </div>
    );
  };
};


export default Editor;
