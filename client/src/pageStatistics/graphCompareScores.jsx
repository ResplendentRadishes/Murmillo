import * as d3 from "d3";
import GraphContainer from './graphContainer.jsx';
require('../styles/navbar.css');

// ======================================================
var graphCompareScores = function(el, compArray, username) {
  // compArray = [{compObj}, {combObj},.....]
  // where compObj = {compDate: ..., problemLevel: ...., winner: true};

  // compute score from objects
  var compWon = compArray.filter(function(compObj) {
    return compObj.winner === true;
  });
  var myScore = compWon.length * 5;

  // create dataToDipslay
  var dataToDipslay = [
            { "user": username.split(' ')[0],   "score": myScore},
            { "user": "User A",   "score": 80     },
            { "user": "User B",   "score": 100    },
            { "user": "User C",   "score": 150    }
          ];

  // margin adjustment
  var margin = {top: 40, right: 20, bottom: 30, left: 20},
      width = 560 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  //for big grouping elements, dates
  var x0 =  d3.scaleBand()
              .rangeRound([-20, width])
              .paddingInner(0.1);
  var y = d3.scaleLinear()
            .rangeRound([height, 0]);
  var xAxis = d3.axisBottom(x0);
  var yAxis = d3.axisLeft(y).ticks(10);

  //----- use of insert instead of append is for inserting the graph before the button elements---
  var svg = d3.select(el).insert("svg", ":first-child")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "graphContainer")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x0.domain(dataToDipslay.map(function(d) {
    return d.user;
  }));
  var maxValue = d3.max(dataToDipslay, function(d) { return d.score; });
  y.domain([0, maxValue]);

  //-----------------------------Add title-----------------------------------------//
  svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Your Score vs Other's Scores");

  // x-axis -------------------
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(30," + height + ")")
      .call(xAxis)
      .style("font-size", "12px")
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "25px")
      .attr("dy", "12px")
       //.attr("transform", "rotate(-90)" );

  // y-axis -------------------
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(10,0)")
      .call(yAxis)
       .style("font-size", "12px")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Scores");

  // texts -------------------
  var state = svg.selectAll(".state")
      .data(dataToDipslay)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) {return "translate(" + x0(d.user) + ",0)"; });

  // rectangle -------------------
  var state = svg.selectAll(".state")
    // state.selectAll("rect")
    .data(dataToDipslay)
    .enter()
    .append("rect")
    .style("fill", "#C67171")
    // .attr("width", 50)
    .attr("width", x0.bandwidth)
    .attr("x", function(d) {
      return x0(d.user)
    })
    .attr("y", function(d) {
      return y(d.score);
    })
    .attr("height", function(d) {
      return height - y(d.score);
    })
    .attr("transform", "translate(30,0)")

  // labels -------------------
  // svg.append("g")
  //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  //   .selectAll(".textlabel")
  //   .data(dataToDipslay)
  //   .enter()
  //   .append("text")
  //   // .attr("class", "textlabel")
  //   .attr("x", function(data) {
  //     return x0(data.user) + (x0.bandwidth()/2);
  //   })
  //   .attr("y", function(data) {
  //     return y(data.score) - 20;
  //   })
  //   .text(function(data){
  //     return data.score;
  //   });

}

export default graphCompareScores;









