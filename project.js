function init(){
    var margin = {top: 20, right: 20, bottom: 30, left: 60};
    var w =650- margin.left - margin.right;
	var h =300- margin.top - margin.bottom;
	var padding = 55;

	var dataset;

	d3.csv("Modern_Renewable_Energy_Production_in_China.csv").then(function(data){
		console.log(data);
		dataset = data;
	});

	
}
    window.onload = init;