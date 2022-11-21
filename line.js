function line(){	
  const margin = {top: 10, right: 100, bottom: 30, left: 60},
  width = 800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#chartLine")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",`translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("Modern_Renewable_Energy_Production_in_China.csv").then(function(data) {

  // List of groups (here I have one group per column)
  const allGroup = ["Total", "Solar", "Wind","Hydro","Others"]

  // add the options to the button
  d3.select("#selectButton1")
    .selectAll('myOptions')
     .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button

    var parseTime = d3.timeParse("%Y");
    data.forEach(function(d){
      d.Year = parseTime(d.Year.toString());
    })
  // Add X axis --> it is a date format

    var x = d3.scaleTime()
    .domain(d3.extent(data,d => d.Year))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain( [0,2400])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Initialize line with group a
  const line = svg
    .append('g')
    .append("path")
      .datum(data)
      .attr("d", d3.line()
      .x(function(d) { return x(+d.Year) })
        .y(function(d) { return y(+d.Total) })
      )
      .attr("stroke", "red")
      .style("stroke-width", 4)
      .style("fill", "none")

  // Initialize dots with group a
  const dot = svg
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr("cx", function(d) { return x(+d.Year) })
      .attr("cy", function(d) { return y(+d.Total) })
      .attr("r", 2)
      .style("fill", "#69b3a2")

  // A function that update the chart
  function update(selectedGroup) {

// Create new data with the selection?
var dataFilter = data.map(function(d){return {time: d.Year, value:d[selectedGroup]} })

// Give these new data to update line
line
  .datum(dataFilter)
  .transition()
  .duration(1000)
  .attr("d", d3.line()
    .x(function(d) { return x(+d.time) })
    .y(function(d) { return y(+d.value) })
  )
dot
.data(dataFilter)
.transition()
.duration(1000)
  .attr("cx", function(d) { return x(+d.time) })
  .attr("cy", function(d) { return y(+d.value) })
}

// When the button is changed, run the updateChart function
d3.select("#selectButton1").on("change", function(d) {
// recover the option that has been chosen
var selectedOption = d3.select(this).property("value")
// run the updateChart function with this selected option
update(selectedOption)
})

})

d3.csv("Modern_Renewable_Energy_Production_in_Germany.csv").then(function(data) {

// List of groups (here I have one group per column)
const allGroup = ["Total", "Solar", "Wind","Hydro","Others"]

// add the options to the button
d3.select("#selectButton2")
.selectAll('myOptions')
 .data(allGroup)
.enter()
.append('option')
.text(function (d) { return d; }) // text showed in the menu
.attr("value", function (d) { return d; }) // corresponding value returned by the button

var parseTime = d3.timeParse("%Y");
data.forEach(function(d){
  d.Year = parseTime(d.Year.toString());
})
// Add X axis --> it is a date format

var x = d3.scaleTime()
.domain(d3.extent(data,d => d.Year))
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain( [0,2400])
.range([ height, 0 ]);
svg.append("g")
.call(d3.axisLeft(y));

// Initialize line with group a
const line = svg
.append('g')
.append("path")
  .datum(data)
  .attr("d", d3.line()
  .x(function(d) { return x(+d.Year) })
    .y(function(d) { return y(+d.Total) })
  )
  .attr("stroke", "Purple")
  .style("stroke-width", 4)
  .style("fill", "none")

// Initialize dots with group a
const dot = svg
.selectAll('circle')
.data(data)
.join('circle')
.attr("cx", function(d) { return x(+d.Year) })
  .attr("cy", function(d) { return y(+d.Total) })
  .attr("r", 2)
  .style("fill", "#69b3a2")

// A function that update the chart
function update(selectedGroup) {

// Create new data with the selection?
var dataFilter = data.map(function(d){return {time: d.Year, value:d[selectedGroup]} })

// Give these new data to update line
line
.datum(dataFilter)
.transition()
.duration(1000)
.attr("d", d3.line()
.x(function(d) { return x(+d.time) })
.y(function(d) { return y(+d.value) })
)
dot
.data(dataFilter)
.transition()
.duration(1000)
.attr("cx", function(d) { return x(+d.time) })
.attr("cy", function(d) { return y(+d.value) })
}

// When the button is changed, run the updateChart function
d3.select("#selectButton2").on("change", function(d) {
// recover the option that has been chosen
var selectedOption = d3.select(this).property("value")
// run the updateChart function with this selected option
update(selectedOption)
})

})
}