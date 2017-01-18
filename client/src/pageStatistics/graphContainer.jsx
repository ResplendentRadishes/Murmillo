import { connect } from 'react-redux';
import Graph from './graph.jsx';
// to add d.status =  [{name: "totalProblems", value: 101}]
var modifyDataSet = function(dataSet, problemNames) {
   dataSet.forEach(function(d) {
    d.problems = problemNames.map(function(name) { // [{name:totalpbls, value:101},
      return {"name": name, "value": d[name]}
    });
   });
   return dataSet;
}
const mapStateToProps = (state) => {
  return {
    problemNames: ['totalpbls', 'wins'], //state.problemNames,
    dataSet: modifyDataSet([ 
             {
              "date" : "4/7/2016", //state
              "totalpbls": 101, "wins": 100
            },
            {
               "date" : "5/7/2016",
               "totalpbls": 10, "wins": 6
            },
            {
              "date" : "6/7/2016",
              "totalpbls": 31, "wins": 30
            },
            {
              "date" : "7/7/2016",
              "totalpbls": 12, "wins": 3
            },
            {
              "date" : "8/7/2016",
              "totalpbls": 15, "wins": 8
            }

],['totalpbls', 'wins'] ) //                            //state.dataSet
  }
}

const GraphContainer = connect(
  mapStateToProps
)(Graph);

export default GraphContainer;
//should be passing ageNames and modified data as props to graph;
/*
 
var ageNames(here problemNames) = ['totalpbls', 'wins'];
//i =0
// d = [States,    totalProblems ,   totalWins]
   // d.ages =  [{name: "totalProblems", value: 101}]

var data = [ 
             {
              "date" : "4/7/2016", //state
              "totalpbls": 101, "wins": 100
            },
            {
               "date" : "5/7/2016",
               "totalpbls": 10, "wins": 6
            },
            {
              "date" : "6/7/2016",
              "totalpbls": 31, "wins": 30
            },
            {
              "date" : "7/7/2016",
              "totalpbls": 12, "wins": 3
            },
            {
              "date" : "8/7/2016",
              "totalpbls": 15, "wins": 8
            }

]
data.forEach(function(d) {
  d.ages = ageNames.map(function(name) { // [{name:totalpbls, value:101},
    return {"name": name, "value": d[name]}
  });
});

*/