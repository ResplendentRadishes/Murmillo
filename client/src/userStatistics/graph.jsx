import React from 'react';
import * as d3 from "d3";
import GraphContainer from './graphContainer.jsx';
// props = dataSet and problemNames
var drawGraph = function(dataSet, problemNames) {
  console.log("Rendering");
  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
     
  //for big grouping elements, states
  var x0 =  d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
  //for the smalle elements in each state, problemNames and wins
  var x1 = d3.scaleBand();
  var y = d3.scaleLinear()
      .rangeRound([height, 0]);
  var color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6"]);
  var xAxis = d3.axisBottom(x0);
  var yAxis = d3.axisLeft(y);
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "graphContainer")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  dataSet.forEach(function(d) {
    d.problems = problemNames.map(function(name) { // [{name:totalpbls, value:101},
      return {"name": name, "value": d[name]}
    });
  });
  x0.domain(dataSet.map(function(d) { return d.date; }));
  x1.domain(problemNames).rangeRound([0, x0.bandwidth()]);
  //console.log(d3.max(dataSet, function(d) { return d3.max(d.problems, function(d) { return d.value; }); }))
  y.domain([0, d3.max(dataSet, function(d) { return d3.max(d.problems, function(d) { return d.value; }); })]);
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("problemNames");
  var state = svg.selectAll(".state")
      .data(dataSet)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x0(d.date) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.problems; })
      .enter().append("rect")
       .attr("width", x1.bandwidth())
       .attr("x", function(d) { return x1(d.name); })
       .attr("y", function(d) { return y(d.value); })
       .attr("height", function(d) { return height - y(d.value); })
       .style("fill", function(d) { return color(d.name); });
  var legend = svg.selectAll(".legend")
      .data(problemNames.slice().reverse())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
}


class Graph extends React.Component {
   // to avoid rerendering, since rerendering was happening because of the DOM manipulation by d3.
   shouldComponentUpdate(nextProps, nextState) {
     return false;
   }
   //--------------------------------------------------------------------------------------------//
   // The graph will be shown in all the pages if i am not deleting it when the component gets unmounted
   //--------------------------------------------------------------------------------------------//
   componentWillUnmount() {
     var el = document.getElementsByClassName('graphContainer')[0];
     console.log(el);
     el.parentNode.removeChild(el);
   }
   render() {

    return (
      <div className="container ">
       {drawGraph(this.props.dataSet.slice(), this.props.problemNames.slice())}
     </div>
    );
  }
}


export default Graph;