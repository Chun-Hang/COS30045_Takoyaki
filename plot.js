function plot(){
	const margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#plot1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

const svg2 = d3.select("#plot2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("Share_Electricity_Renewable_in_China.csv").then(function(data) {

	var parseTime = d3.timeParse("%Y");
    data.forEach(function(d){
      d.Year = parseTime(d.Year.toString());
    })
	// Add X axis
  const x = d3.scaleTime()
    .domain(d3.extent(data,d => d.Year))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 25])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 100)
    .attr("y", height + 33)
    .text("Year of Production");

  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -60)
    .attr("dy", ".95em")
    .attr("transform", "rotate(-90)")
    .text("Electricity Produced (% electricity)");
  // Color scale: give me a specie name, I return a color

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("cx", function (d) { return x(d.Year); } )
      .attr("cy", function (d) { return y(d.Hydro); } )
      .attr("r", 5)
	  .style("fill", "blue" )
	  .append("title")
	  .text(function(d){
		return "Hydro Share Electricity: " + d.Hydro;
	  })
	 

	  svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("cx", function (d) { return x(d.Year); } )
      .attr("cy", function (d) { return y(d.Solar); } )
      .attr("r", 5)
      .style("fill", "red" )
	  .append("title")
	  .text(function(d){
		return "Solar Share Electricity: " + d.Solar;
	  })
	 

	  svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("cx", function (d) { return x(d.Year); } )
      .attr("cy", function (d) { return y(d.Wind); } )
      .attr("r", 5)
      .style("fill", "green" )
	  .append("title")
	  .text(function(d){
		return "Wind Share Electricity: " + d.Wind;
	  })
	
	  svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("cx", function (d) { return x(d.Year); } )
      .attr("cy", function (d) { return y(d.Others); } )
      .attr("r", 5)
      .style("fill", "black" )
	  .append("title")
	  .text(function(d){
		return "Others Renewable Share Electricity: " + d.Others;
	  })

})

d3.csv("Share_Electricity_Renewable_in_Germany.csv").then(function(data) {

var parseTime = d3.timeParse("%Y");
data.forEach(function(d){
  d.Year = parseTime(d.Year.toString());
})
// Add X axis
const x = d3.scaleTime()
.domain(d3.extent(data,d => d.Year))
.range([ 0, width ]);
svg2.append("g")
.attr("transform", `translate(0, ${height})`)
.call(d3.axisBottom(x));

// Add Y axis
const y = d3.scaleLinear()
.domain([0, 25])
.range([ height, 0]);
svg2.append("g")
.call(d3.axisLeft(y));

svg2.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", width - 100)
.attr("y", height + 33)
.text("Year of Production");

svg2.append("text")
.attr("class", "y label")
.attr("text-anchor", "end")
.attr("y", -60)
.attr("dy", ".95em")
.attr("transform", "rotate(-90)")
.text("Electricity Produced (% electricity)");
// Color scale: give me a specie name, I return a color

// Add dots
svg2.append('g')
.selectAll("dot")
.data(data)
.join("circle")
  .attr("cx", function (d) { return x(d.Year); } )
  .attr("cy", function (d) { return y(d.Hydro); } )
  .attr("r", 5)
  .style("fill", "blue" )
  .append("title")
	  .text(function(d){
		return "Hydro Share Electricity: " + d.Hydro;
	  })
	 

  svg2.append('g')
.selectAll("dot")
.data(data)
.join("circle")
  .attr("cx", function (d) { return x(d.Year); } )
  .attr("cy", function (d) { return y(d.Solar); } )
  .attr("r", 5)
  .style("fill", "red" )
  .append("title")
	  .text(function(d){
		return "Solar Share Electricity: " + d.Solar;
	  })

  svg2.append('g')
.selectAll("dot")
.data(data)
.join("circle")
  .attr("cx", function (d) { return x(d.Year); } )
  .attr("cy", function (d) { return y(d.Wind); } )
  .attr("r", 5)
  .style("fill", "green" )
  .append("title")
	  .text(function(d){
		return "Wind Share Electricity: " + d.Wind;
	  })

  svg2.append('g')
.selectAll("dot")
.data(data)
.join("circle")
  .attr("cx", function (d) { return x(d.Year); } )
  .attr("cy", function (d) { return y(d.Others); } )
  .attr("r", 5)
  .style("fill", "black" )
  .append("title")
	  .text(function(d){
		return "Others Renewable Share Electricity: " + d.Others;
	  })

})
}
