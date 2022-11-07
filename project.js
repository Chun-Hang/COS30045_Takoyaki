function init(){
    var margin = {top: 20, right: 20, bottom: 30, left: 60};
    var w =650- margin.left - margin.right;
	var h =300- margin.top - margin.bottom;
	var padding = 55;

	var dataset;

	d3.csv("Modern_Renewable_Energy_Production_in_China.csv").then(function(data){
		console.log(data);
		dataset = data;
		lineChart(dataset);
	});

	function lineChart(){
		xScale = d3.scaleTime()
					.domain([
						d3.min(dataset, function(d){return d.Year;}),
						d3.max(dataset, function(d){return d.Year;})
					])
					.range([0,w]);

		yScale = d3.scaleLinear()
					.domain([0, d3.max(dataset, function(d){return d.Wind;})
					])
					.range([h,0]);
		
		line = d3.line()
	            	.defined(function(d){ return d.Year >= 1965;})
					.x(function(d){return xScale(d.Year);})
					.y(function(d){return yScale(d.Wind);});
				
		area = d3.area()
					.defined(function(d){ return d.Year >= 0;})
					.x(function(d)  { return xScale(d.Year); })
					.y0(function()  {return yScale.range()[0];})
					.y1(function(d) {return yScale(d.Wind); });


		var svg = d3.select("#chartLine")
					.append("svg")
					.attr("width", w+ margin.left + margin.right)
					.attr("height", h+ margin.top + margin.bottom)
					.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				svg.append("path")
					.datum(dataset)
					.attr("class", "area")
					.attr("d", area);			

		
		var xAxis = d3.axisBottom()
                    .scale(xScale);
    	var yAxis = d3.axisLeft()
                    .scale(yScale);

		svg.append("g")
			.attr("transform","translate(0, " + h +")")
			.call(xAxis);

		svg.append("g")
		.call(yAxis);
	
	}

	
}
    window.onload = init;