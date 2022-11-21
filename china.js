function china(){
	var w =800;
	var h =600;

	var projection = d3.geoMercator()
	.center([100,40])
	.translate([w/2,h/2])
	.scale(660);

var path = d3.geoPath()
.projection(projection);

var svg = d3.select("#map2")
.append("svg")
.attr("width",w)
.attr("height",h)
.attr("fill","#48D1CC");

d3.csv("Global_Powerplant_in_China.csv").then((factory) => {
d3.csv("chinaState.csv").then((test) => {
d3.json("china.json").then(function(json){
test.forEach(data => {
var dataState = data.state;
var dataNo = data.no;
json.features.forEach(state => {
 if (state.properties.engName == dataState) {
	 state.properties.value = parseInt(dataNo)
 }
})
})


svg.selectAll("path")
.data(json.features)
.enter()
.append("path")
.attr("d", path)
.attr("fill", function(d){
 var value = d.properties.value
 return `rgb(200,${Math.round(value*35)},160)`
})
.on("mouseover", function () {
 var hover = d3.select(this)
	 .attr("class", "state")
	 .attr("fill", "lime")
	 .transition()
})
.on("mouseout", function (event, d) {
 d3.select(this)
	 .attr("class", "state")
	 .attr("fill", "grey")
	 .attr("fill", function(d) {
		 var value = d.properties.value
		 return `rgb(200,${Math.round(value*35)},160)`
	 })
 })
				
							svg.selectAll("circle")
											.data(factory)
											.enter()
											.append("circle")
											.attr("cx", function(d){
													return projection([d.Longitude, d.Latitude])[0];
												})
												.attr("cy", function(d){
													return projection([d.Longitude, d.Latitude])[1];
												})
											.attr("r",2)
											.attr("fill", d =>{
                            if(d.Primary_Fuel == "Solar"){
                                return "red";
                            }else if(d.Primary_Fuel == "Wind"){
                                return "green";
                            }else if(d.Primary_Fuel == "Hydro"){
                                return "blue";
                            }else
                            {
                                return "black";
                            }}
                        )
											.append("title")
											.text(function(d){
												return "Energy Capacity: "+ d.Capacity ;
											});
						})
					})
				})
}
