import * as d3 from "d3";
import GraphContainer from './graphContainer.jsx';
require('../styles/navbar.css');

var graphTotalWins = function(el, data) {

  var newArray = [];
  var prevData = "";
  var newObj = {};

  //for this to work make sure that data is sorted by compDate
  data.forEach(function(element) {
   var date = element.compDate;

   if(newObj.date === date ) {
      if(element.winner){
       element.problemLevel === "hard" ? (newObj.hard += 1, newObj.winshard += 1): element.problemLevel === "medium" ? (newObj.medium += 1, newObj.winsmedium += 1): (newObj.easy += 1, newObj.winseasy += 1);
       newObj.totalpbls += 1;
       newObj.winsTotal += 1;
      }
   }
   else {// if data is already sorted, this will only happens when new problemLevel is encountered.
     newObj = JSON.parse(JSON.stringify(newObj));
     newObj.date = element.compDate;
     if(element.winner){
       newObj.winsTotal = 1;
       element.problemLevel === "hard" ? (newObj.hard = 1, newObj.winshard = 1,newObj.winsmedium =0, newObj.winseasy = 0, newObj.medium =0, newObj.easy =0): element.problemLevel === "medium" ? (newObj.medium = 1, newObj.winsmedium = 1, newObj.winshard = 0,newObj.winseasy =0, newObj.easy = 0, newObj.hard = 0): (newObj.easy = 1, newObj.winseasy= 1, newObj.winshard = 0,newObj.winsmedium =0, newObj.hard =0, newObj.medium = 0);
     }else {
       element.problemLevel === "hard" ? (newObj.hard = 1, newObj.winshard = 0,newObj.winsmedium =0, newObj.winseasy = 0, newObj.medium =0, newObj.easy =0): element.problemLevel === "medium" ? (newObj.medium = 0, newObj.winsmedium = 0, newObj.winshard = 0,newObj.winseasy =0, newObj.easy = 0, newObj.hard = 0): (newObj.easy = 1, newObj.winseasy= 0, newObj.winshard = 0,newObj.winsmedium =0, newObj.hard =0, newObj.medium = 0);
       newObj.winsTotal = 0;
     }
     newObj.totalpbls = 1;
     newArray.push(newObj);
   }

  });
  data = newArray;

  // margin config
  var margin = {top: 40, right: 20, bottom: 30, left: 20},
      width = 560 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  //for big grouping elements, dates
  var x0 =  d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
  //for the smalle elements in each date, problemNames and wins
  var x1 = d3.scaleBand();
  var y = d3.scaleLinear()
            .rangeRound([height, 0]);
  //------------------------------------------------------------------------------------------//
  //"totalpbls","medium","easy" ,"hard","winsTotal","winsmedium","winseasy","winshard"
  //Above are the column headers. last four headers will be having the same color(#9D8884)
  //------------------------------------------------------------------------------------------//
  var color = d3.scaleOrdinal()
                .range(["#C67171", "#FFC1C1"]);//"#a05d56",
  var xAxis = d3.axisBottom(x0);
  var yAxis = d3.axisLeft(y);//.insert("g",":first-child")'
  var svg = d3.select(el).insert("svg",":first-child")//d3.select(el).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "graphContainer")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var ageNames = ['totalpbls', 'winsTotal'];
  x0.domain(data.map(function(d) {
                      return d.date;
                  }))//d.date; }));
  y.domain(data.map(function(d) {
                    return d.totalpblms;
                  }))

  data.forEach(function(d) {
    d.ages = ageNames.map(function(name) { // [{name:totalpbls, value:101},
      return {"name": name, "value": d[name]}
    });
  });

  x0.domain(data.map(function(d) { return d.date; }));
  x1.domain(ageNames).rangeRound([0, x0.bandwidth()]);
  //console.log(d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); }))
  y.domain([0, d3.max(data, function(d) {
                        return d.totalpbls;
            })]);

  //-----------------------------Add title-----------------------------------------//
  svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Total Number of Wins vs Competion Attempted")

  // X-axis -------------------
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(5," + height + ")")
      .call(xAxis)
      .style("font-size", "12px")

  // Y-axis -------------------
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(5,0)")
      .call(yAxis)
      .style("font-size", "12px")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 20)
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      // .text("Problems")

  // State -------------------
  var state = svg.selectAll(".state")
      .data(data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) {return "translate(" + x0(d.date) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
       .attr("width", x1.bandwidth())
       .attr("x", function(d) { return x1(d.name); })
       .attr("y", function(d) { return y(d.value); })
       .attr("height", function(d) { return height - y(d.value); })
       .style("fill", function(d) { return color(d.name); })
      .attr("transform", "translate(5,0)")

  svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .selectAll(".textlabel")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "textlabel")
      .attr("x0", function(data){ return x0(data.date) + (x0.bandwidth()/2); })
      .attr("y", function(data){ return y(data.score) - 20; })
      .text(function(data){  return data.score; })
      .style("font-size", "12px")

  state.selectAll("text")
  .data(function(d) { return d.ages; })
        .enter().append("text")
        .attr("class","barstext")
        .attr("x", function(d) { return x1(d.name); })
        .attr("y",function(d) { return y(d.value); })
        .text(function(d){ return (d.value);})
      .attr("transform", "translate(10,0)")

  // legend -------------------
  ageNames = ["Attempted", "Won"];
  var legend = svg.selectAll(".legend")
      .data(ageNames.slice())
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
      .text(function(d) { return d; })
      .style("font-size", "12px")
}

export default graphTotalWins;









