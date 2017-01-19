
import * as d3 from "d3";
import GraphContainer from './graphContainer.jsx';
require('../styles/navbar.css');

var graphCompareScores = function(el, data) {
  
  
  data = [{"user":"Yoshi", "score": 10}, {"user":"Nimmy","score": 5}, {"user":"Vernon","score": 100 },  {"user":"Robert","score": 40 }];
 
  var margin = {top: 40, right: 20, bottom: 30, left: 20},
      width = 560 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;
     
  //for big grouping elements, dates
  var x0 =  d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
  var y = d3.scaleLinear()
      .rangeRound([height, 0]);
  var xAxis = d3.axisBottom(x0);
  var yAxis = d3.axisLeft(y).ticks(10);
  //----- use of insert instead of append is for inserting the graph before the button elements---//
  var svg = d3.select(el).insert("svg",":first-child")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "graphContainer")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x0.domain(data.map(function(d) { 
                      return d.user; }))//d.date; }));
  var maxValue = d3.max(data, function(d) { return d.score; });
  console.log("y is ");
  console.log(y);
  y.domain([0, maxValue]);


svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
     .style("text-anchor", "end")
     .attr("dx", "-.8em")
     .attr("dy", "-.10em")
     //.attr("transform", "rotate(-90)" );
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Scores");

var state = svg.selectAll(".state")
    .data(data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function(d) {return "translate(" + x0(d.user) + ",0)"; });

state.selectAll("rect")
    .data(data)
    .enter().append("rect")
     .style("fill", "#C67171")
     .attr("width", x0.bandwidth())
     .attr("x", function(d) { return x0(d.user) })
     .attr("y", function(d) { return y(d.score); })
     .attr("height", function(d) { return height - y(d.score); })
     
 svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .selectAll(".textlabel")
    .data(data)
    .enter()
    .append("text")
   // .attr("class", "textlabel")
    .attr("x", function(data){ return x0(data.user) + (x0.bandwidth()/2); })
    .attr("y", function(data){ return y(data.score) - 20; })
    .text(function(data){ console.log(data.score); return data.score; });
    
}
export default graphCompareScores;









