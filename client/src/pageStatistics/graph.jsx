import React from 'react';
var ReactDOM = require('react-dom');
import drawGraph from './svg.jsx';
import graphTotalWins from './graphtotalWins.jsx'
import graphCompareScores from './graphCompareScores.jsx'
var moment = require('moment');

class Graph extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
    dataSet : [],
   };
  }

  getDataSingleUser(functionName,dataSet) {
    // console.log((dataSet));
   var data = [];
   var currentTime =  moment(new Date());
   var timeStart = currentTime.subtract(7,'days');
   dataSet = dataSet.map(function(element) {
     element.compDate =  moment(new Date(element.compDate));
     return element;
   });

   dataSet = dataSet.sort(function(a, b) {
     return b.compDate - a.compDate;
   });

   dataSet.forEach(function(element) {
    if(functionName === "previousWeek"){
      if(currentTime.diff(moment(element.compDate),'days') < 7 ){
       element.compDate = moment(element.compDate).format('MM-DD-YYYY');
       data.push(element);
      }
    } else {
      if(functionName === "totalWins") {
        if(currentTime.diff(moment(element.compDate),'days') < 20 ){
         element.compDate = moment(element.compDate).format('MM-DD-YYYY');
         data.push(element);
        }
      }
    }

   });
     return data;
   }

   componentDidMount() {
     var el = ReactDOM.findDOMNode(this);
     var data = this.getDataSingleUser("previousWeek",this.props.dataSet.slice());
     drawGraph(el, data);
   }
   //--------------------------------------------------------------------------------------------------//
    /* Before appending new graph we have to remove the one which is already created */
   //--------------------------------------------------------------------------------------------------//
   drawGraphMain(dataSet) {
     var el = ReactDOM.findDOMNode(this);
     var elem = document.getElementsByTagName("svg")[0];
     elem.parentNode.removeChild(elem);
     var data = this.getDataSingleUser("previousWeek", this.props.dataSet);
     drawGraph(el, data);
   }

   drawGraphTotalWins(dataSet) {
    var data = this.getDataSingleUser("totalWins",this.props.dataSet.slice());
    var el = ReactDOM.findDOMNode(this);
    var elem = document.getElementsByTagName("svg")[0];
    elem.parentNode.removeChild(elem);
    graphTotalWins(el, data);
   }

  drawGraphCompareScores(dataSet, username) {
    var el = ReactDOM.findDOMNode(this);
    var elem = document.getElementsByTagName("svg")[0];
    elem.parentNode.removeChild(elem);
    graphCompareScores(el, dataSet, username);
  }

   render() {
    return (
     <div>
      <div className="buttons">
        <button
         className="btn btn-info btn-md"
         type="button"
         onClick={() => this.drawGraphTotalWins("totalWins")}>
            Show Total Number of Wins
        </button>
        <button
         className="btn btn-info btn-md"
         type="button"
         onClick={() => this.drawGraphCompareScores(this.props.dataSet.slice(), this.props.username)}>
            Compare Scores
        </button>
        <button
         className="btn btn-info btn-md"
         type="button"
         onClick={() => this.drawGraphMain("previousWeek")}>
            Previous Week
        </button>
      </div>
     </div>
    )
  }
}


export default Graph;
