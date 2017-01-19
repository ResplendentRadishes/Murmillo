import * as d3 from "d3";
import GraphContainer from './graphContainer.jsx';
require('../styles/navbar.css');

var drawGraph = function(el, data, problemNames) {
  var newArray = [];
  var prevData = "";
  var newObj = {};
  //---------------for this to work make sure that data is sorted by compDate------------------------//
  data.forEach(function(element) {
    var date = element.compDate;
    if(newObj.date === date ) {
      if(element.winner){
        element.problemLevel === "hard" ? (newObj.hard += 1, newObj.winshard += 1): element.problemLevel === "medium" ? (newObj.medium += 1, newObj.winsmedium += 1): (newObj.easy += 1, newObj.winseasy += 1);
        newObj.totalpbls += 1;
        newObj.winsTotal += 1;
      }
    }
    else {// ----- if data is already sorted, this will only happens when new problemLevel is encountered ----//
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
  var margin = {top: 40, right: 20, bottom: 30, left: 20},
    width = 600 - margin.left - margin.right,
    height =300 - margin.top - margin.bottom;
     
  //----------for big grouping elements, dates --------------------//
  var x0 =  d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
  //----------for the smalle elements in each date, problemNames and wins------//
  var x1 = d3.scaleBand();
  var y = d3.scaleLinear()
      .rangeRound([height, 0]);
  //------------------------------------------------------------------------------------------//
  //"totalpbls","medium","easy" ,"hard","winsTotal","winsmedium","winseasy","winshard"
  //Above are the column headers. last four headers will be having the same color(#9D8884)
  //------------------------------------------------------------------------------------------//
  var color = d3.scaleOrdinal()
    .range([ "#5dc3da", "#b2ab2e", '#60BD68', '#5da5da', "#b2972e", "#608cbd"]);//"#a05d56", 
  var xAxis = d3.axisBottom(x0);
  var yAxis = d3.axisLeft(y);


 var svg = d3.select(el).insert("svg",":first-child")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "graphContainer")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//-------------------------------------------------------------------------------//
 // Create groups for each series, rects for each segment 
// var groups = svg.selectAll("g.cost")
//   .data(data)
//   .enter().append("g")
//   .attr("class", "cost")
//   .style("fill", function(d, i) { return "yellow"; });


//--------------------------------------------------------------//

 var yBegin;
 var innerColumns = {
    "column2" : ["easy","winseasy"],
    "column3" : ["medium","winsmedium"],
    "column4" : ["hard", "winshard"]
  }

  
 var columnHeaders =d3.keys(data[0]).filter(function(key) {
   return (key !== "date" && key!=="totalpbls" && key!=="winsTotal");});
//------------------------Below is a temporary fix------------------------------------------//
 columnHeaders = ["easy", "medium", "hard", "winseasy", "winsmedium", "winshard"];
//------------------------------------------------------------------------------------------//
 color.domain(d3.keys(data[0]).filter(function(key) { return (key !== "date" && key!=="totalpbls" && key!=="winsTotal"); }));
 //------------------------Below is a temporary fix------------------------------------------//
 color.domain(["easy", "medium", "hard", "winseasy", "winsmedium", "winshard"]);

  
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
        return {name: name, column: ic, yBegin: 0, yEnd: +d[name] + yBegin};
      }
    }
  });
  d.total = d3.max(d.columnDetails, function(d) { 
    return d.yEnd; 
  });
});
  
  x0.domain(data.map(function(d) { 
             return d.date; }))
  
  x1.domain(d3.keys(innerColumns)).rangeRound([0, x0.bandwidth()]);
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
      .attr("dy", ".50em")
      // .attr("transform", function(d) {
      //     return "rotate(-80)" 
      // });

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 6)
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("problemNames");

  //-----------------------------Add title-----------------------------------------//
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
      .data(function(d) {return d.columnDetails; })
      .enter()
      .append("rect")
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
      //.style("stroke", "black")
      //.style("stroke-width", 2)
      .on("mouseover", function() {
        tooltip.style("display", 'inline'); 
      })
      .on("mouseout", function() { 
        
        tooltip.style("display", "none"); 
      })
      .on("mousemove", function(d, i) {
        // var xPosition  = (d3.mouse(this)[0]);//- 15;
        // var yPosition  = d3.mouse(this)[1] ;//- 25;
        tooltip.attr("transform", "translate(" + (width/2)+ "," + (height/8) + ")");

    var getToolTipText = function(d) {
      if(d.name === "hard") return ("Problem: Hard, Attempted: "+d.yEnd);
      if(d.name === "medium") return ("Problem: Medium, Attempted: "+d.yEnd);
      if(d.name === "easy") return ("Problem: Easy, Attempted: "+d.yEnd);
      if(d.name === "winshard") return ("Problem: Hard, Won: "+d.yEnd);
      if(d.name === "winsmedium") return ("Problem: Medium, Won: "+d.yEnd);
      if(d.name === "winseasy") return ("Problem: Easy, Won: "+d.yEnd);
    }
    tooltip.select("text").text(getToolTipText(d));
  });
 columnHeaders = ["Easy", "Medium", "Hard", "WinsEasy", "WinsMedium", "WinsHard"];
   color.domain(columnHeaders);
 var legend = svg.selectAll(".legend")
    .data(columnHeaders.slice())//.reverse()
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
   

 legend.append("rect")
    .attr("x", width - 19)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", color);

 legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .style("font-size", "12px")
    .text(function(d) { return d; });

  var tooltip = svg.append("g")
    .attr("class", "tooltip1")
    .style("display", "none");
      
  tooltip.append("rect")
    .attr("fill", "red")
    .style("opacity", 0.5);

  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
};
export default drawGraph;