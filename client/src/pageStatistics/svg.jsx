import * as d3 from "d3";
import GraphContainer from './graphContainer.jsx';
require('../styles/navbar.css');
// props = dataSet and problemNames
var drawGraph = function(el, data, problemNames) {
 
  /*
   [{"id":1,"problemLevel":"medium","winner":0,"compDate":"2016-12-24T14:00:00.000Z","createdAt":"2017-01-16T15:35:37.000Z","updatedAt":"2017-01-16T15:35:37.000Z"},
   {"id":2,"problemLevel":"medium","winner":0,"compDate":"2017-01-04T14:00:00.000Z","createdAt":"2017-01-16T15:35:37.000Z","updatedAt":"2017-01-16T15:35:37.000Z"}
  */
   var newArray = [];
   var prevData = "";
   var newObj = {};
   //for this to work make sure that data is sorted by compDate
   data.forEach(function(element) {
     var date = element.compDate;
     
     if(newObj.date === date ) {
        if(element.winner === 1){
         element.problemLevel === "hard" ? (newObj.hard += 1, newObj.winshard += 1): element.problemLevel === "medium" ? (newObj.medium += 1, newObj.winsmedium += 1): (newObj.easy += 1, newObj.winseasy += 1);
         newObj.totalpbls += 1;
         newObj.winsTotal += 1;
        }
     }
     else {// if data is already sorted, this will only happens when new problemLevel is encountered.
       newObj = JSON.parse(JSON.stringify(newObj));
       newObj.date = element.compDate;
       if(element.winner === 1){
         newObj.winsTotal = 1;
         element.problemLevel === "hard" ? (newObj.hard = 1, newObj.winshard = 1,newObj.winsmedium =0, newObj.winseasy = 0, newObj.medium =0, newObj.easy =0): element.problemLevel === "medium" ? (newObj.medium = 1, newObj.winsmedium = 1, newObj.winshard = 0,newObj.winseasy =0, newObj.easy = 0, newObj.hard = 0): (newObj.easy = 1, newObj.winseasy= 1, newObj.winshard = 0,newObj.winsmedium =0, newObj.hard =0, newObj.medium = 0);
       }else {
         element.problemLevel === "hard" ? (newObj.hard = 1, newObj.winshard = 0,newObj.winsmedium =0, newObj.winseasy = 0, newObj.medium =0, newObj.easy =0): element.problemLevel === "medium" ? (newObj.medium = 0, newObj.winsmedium = 0, newObj.winshard = 0,newObj.winseasy =0, newObj.easy = 0, newObj.hard = 0): (newObj.easy = 1, newObj.winseasy= 0, newObj.winshard = 0,newObj.winsmedium =0, newObj.hard =0, newObj.medium = 0);
         newObj.winsTotal = 0;
       }
       newObj.totalpbls = 1;
       newArray.push(newObj);
     }
     
   }); //["medium","easy","hard","totalpbls","Wins"]
  // console.log("--------------------------------------------------------------");
     
    // data = newArray;
   data = [ 
            {
              "date" : "4/7/2016", //state
              "totalpbls": 60, "medium": 10,  "easy" : 30,  "hard": 20, "winsTotal": 40, "winsmedium":9,"winseasy": 21,"winshard": 10
            },
            {
               "date" : "5/7/2016",
               "totalpbls": 10, "winsTotal": 6, "medium": 5, "easy" : 4, "hard": 1,"winsmedium" : 5,"winseasy": 1, "winshard": 0
            },
            {
              "date" : "6/7/2016",
              "totalpbls": 31, "winsTotal": 30, "medium": 10, "easy" : 20, "hard": 1,"winsmedium" : 10,"winseasy": 19, "winshard": 1
            },
            {
              "date" : "7/7/2016",
              "totalpbls": 12, "winsTotal": 3, "medium": 6, "easy" : 6, "hard": 0,"winsmedium" : 1,"winseasy": 1, "winshard": 1
            },
            {
              "date" : "8/7/2016",
              "totalpbls": 15, "winsTotal": 8, "medium": 5, "easy" : 10, "hard": 0,"winsmedium" : 5,"winseasy": 3, "winshard": 0
            }

];

  
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
    .range(["#C67171", "#FFC1C1", "#A74CAB", "#6b486b", '#BCED91', '#BCED91', '#BCED91', '#BCED91']);//"#a05d56", 
  var xAxis = d3.axisBottom(x0);
  var yAxis = d3.axisLeft(y);

  var svg = d3.select(el).insert("svg",":first-child")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "graphContainer")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var yBegin;
 
  var innerColumns = {
    "column1" : ["totalpbls","winsTotal"],
    "column2" : ["easy","winseasy"],
    "column3" : ["medium","winsmedium"],
    "column4" : ["hard", "winshard"]
  }

  
  var columnHeaders =d3.keys(data[0]).filter(function(key) { return key !== "date"; });
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
  
  data.forEach(function(d) {
    var yColumn = new Array();
    d.columnDetails = columnHeaders.map(function(name) {
      for (var ic in innerColumns) {
        if(innerColumns[ic].indexOf(name) >= 0){
          if (!yColumn[ic]){
            yColumn[ic] = 0;
          }
          //yBegin = yColumn[ic];
          yBegin = 0;
          yColumn[ic] += +d[name];
          //return {name: name, column: ic, yBegin: yBegin, yEnd: +d[name] + yBegin,};
          return {name: name, column: ic, yBegin: 0, yEnd: +d[name] + yBegin};
        }
      }
    });
    d.total = d3.max(d.columnDetails, function(d) { 
      return d.yEnd; 
    });
    //console.log(JSON.stringify(d.columnDetails));
  });
  
  x0.domain(data.map(function(d) { 
            return d.date; }))//d.date; }));
  
  x1.domain(d3.keys(innerColumns)).rangeRound([0, x0.bandwidth()]);
  //console.log(d3.max(dataSet, function(d) { return d3.max(d.problems, function(d) { return d.value; }); }))
  y.domain([0, d3.max(data, function(d) { 
    return d.total; 
  })]);  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "2.0em")
      .attr("dy", ".15em")
      .attr("transform", function(d) {
          return "rotate(-65)" 
      });

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("problemNames");
    //Add title
  svg.append("text")
        .attr("x", (width / 2))     
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Performance Statistics");
  
 

  var project_stackedbar = svg.selectAll(".project_stackedbar")
      .data(data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x0(d.date) + ",0)"; });

  project_stackedbar.selectAll("rect")
      .data(function(d) { return d.columnDetails; })
      .enter().append("rect")
      .attr("width", x1.bandwidth())
      .attr("x", function(d) { 
        return x1(d.column);
         })
      .attr("y", function(d) { 
        return y(d.yEnd); 
      })
      .attr("height", function(d) { 
        return y(d.yBegin) - y(d.yEnd); 
      })
      .style("fill", function(d) { return color(d.name); })
      .style("stroke", "black")
      .style("stroke-width", 2);

   var newArray = [];
   columnHeaders.map(function(element) {
    if(element.indexOf("win") === -1){
     newArray.push(element);
    }
  });
   newArray.push("Wins");
   columnHeaders = newArray;
   color.domain(columnHeaders);
   var legend = svg.selectAll(".legend")
      .data(columnHeaders.slice())//.reverse()
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
    };

export default drawGraph;