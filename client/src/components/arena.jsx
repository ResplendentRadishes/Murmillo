import React from 'react';
import CodeContainer from '../containers/codeContainer.jsx';
import ArenaInformation from './arenaInformation.jsx';

var problem = {
  title: 'Enter True',
  code: '// Just type in return true \n// It\'s that simple \nvar returnTrue = function() {\n  // Your code here\n};',
  desc: 'All you need to do is return true. Not false, not 0, not anything else, just true. For gods sake, don\'t enter anything else!'
}
const Arena = (props) => (
  <div className="container-fluid">
    <h1>{problem.title}</h1>
    <div className="row">
      <div className="col-md-5">
        <ArenaInformation desc={problem.desc}/>
      </div>
      <div className="col-md-7">
        <CodeContainer code={problem.code}/>
      </div>
    </div>
  </div>
);

export default Arena;