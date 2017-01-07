import React from 'react';

const ArenaInformation = (props) => (
  <div>
    <div className="panel panel-default">
      <div className="panel-heading">
        Description:
      </div>
      <div className="panel-body" style={{minHeight: 200, maxHeight: 200}}>
        {props.desc}
      </div>
    </div>
    <div className="panel panel-default">
      <div className="panel-heading">
        Submission Result
      </div>
      <div className="panel-body" style={{minHeight: 358, maxHeight: 358}}>
        {props.status}
      </div>
    </div>
  </div>
);

export default ArenaInformation;
