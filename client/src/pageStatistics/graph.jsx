import React from 'react';
var ReactDOM = require('react-dom');
import drawGraph from './svg.jsx';
import graphTotalWins from './graphtotalWins.jsx'
import graphCompareScores from './graphCompareScores.jsx'
import Axios from 'axios';
var moment = require('moment');

class Graph extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
      dataSet : [],
     };
   }
  /*
     data = [ 
             {
              "date" : "4/7/2016", //state
              "totalpbls": 60, "medium": 10,  "easy" : 30,  "hard": 20, "winsTotal": 40, "winsMedium":9,"winsEasy": 21,"winsHard": 10
            },
            {
               "date" : "5/7/2016",
               "totalpbls": 10, "winsTotal": 6, "medium": 5, "easy" : 4, "hard": 1,"winsMedium" : 5,"winsEasy": 1, "winsHard": 0
            },
            {
              "date" : "6/7/2016",
              "totalpbls": 31, "winsTotal": 30, "medium": 10, "easy" : 20, "hard": 1,"winsMedium" : 10,"winsEasy": 19, "winsHard": 1
            },
            {
              "date" : "7/7/2016",
              "totalpbls": 12, "winsTotal": 3, "medium": 6, "easy" : 6, "hard": 0,"winsMedium" : 1,"winsEasy": 1, "winsHard": 1
            },
            {
              "date" : "8/7/2016",
              "totalpbls": 15, "winsTotal": 8, "medium": 5, "easy" : 10, "hard": 0,"winsMedium" : 5,"winsEasy": 3, "winsHard": 0
            }

];
Data Received
 {"id":1,"problemLevel":"medium","winner":0,"compDate":"2016-12-24T14:00:00.000","
 
 // have to format all the data in such a way that i get all the wins and number of participation for a particular date
var test1 = new Date("01/12/2015");
var test2 = new Date("12/12/2014");

var result_diff = moment(test1).diff(moment(test2), "days"); // 31
  */
   getDataSingleUser(dataSet) {
     var data = [];
     var currentTime =  moment(new Date());
     var timeStart = currentTime.subtract(7,'days');
     dataSet = dataSet.map(function(element) {
       element.compDate =  new Date(element.compDate);
       return element;
     });
     
     dataSet = dataSet.sort(function(a, b) {
       return b.compDate - a.compDate;
     });
    
    
     dataSet.forEach(function(element) {
       if(currentTime.diff(moment(element.compDate),'days') < 20){
        element.compDate = moment(element.compDate).format('MM-DD-YYYY');
        data.push(element);
       }
    });
     this.setState({dataSet: data});
   }
  
   componentDidMount() {
     let context = this;
     Axios.get('/user/stats/1')
     .then(res => {
       context.getDataSingleUser(res.data);
      var el = ReactDOM.findDOMNode(context);
       console.log(context);
      drawGraph(el, context.state.dataSet.slice() , context.props.problemNames.slice());
     });
     
   }
   //--------------------------------------------------------------------------------------------------//
    /* Before appending new graph we have to remove the one which is already created */
   //--------------------------------------------------------------------------------------------------//
   drawGraphMain(dataSet) {
     var el = ReactDOM.findDOMNode(this);
     var elem = document.getElementsByTagName("svg")[0];
     elem.parentNode.removeChild(elem);
     this.getDataSingleUser(dataSet);
     drawGraph(el, dataSet);
   }

   drawGraphTotalWins(dataSet) {
     var el = ReactDOM.findDOMNode(this);
     var elem = document.getElementsByTagName("svg")[0];
     elem.parentNode.removeChild(elem);
     graphTotalWins(el, dataSet);
   }
   // shouldComponentUpdate(nextProps, nextState) {
   //   return false;
   // }
  
  drawGraphCompareScores(dataSet) {
    var el = ReactDOM.findDOMNode(this);
    var elem = document.getElementsByTagName("svg")[0];
    elem.parentNode.removeChild(elem);
    graphCompareScores(el,dataSet);
  }
   
   //context.props.dataSet.slice()
   render() {
    return (
     <div>
      
      <button
       className="btn btn-info btn-md"
       type="button"
       onClick={() => this.drawGraphTotalWins(this.state.dataSet)}> Show Total Number of wins</button>
      <button
       className="btn btn-info btn-md"
       type="button"
       onClick={() => this.drawGraphCompareScores(this.state.dataSet)}> Compare Scores </button>
       <button
       className="btn btn-info btn-md"
       type="button"
       onClick={() => this.drawGraphMain(this.state.dataSet)}> Previous Week </button>
     </div>
    )
  }
}


export default Graph;
//{drawGraph(this.props.dataSet.slice(), this.props.problemNames.slice())}