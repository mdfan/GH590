//Width and height settings
var settings = {
	width:1000,
	height:500,
	radius:8,
	padding:60
}

//Scale-setting function
var setScales=function() {
	//Get min/max values for x
	xValues=data.map(function(d) {return Number(d.mig_2012/100,000)})
	xMin=d3.min(xValues)
	xMax=d3.max(xValues)

	// Using a function for y
	yMin = d3.min(data, function(d ){return Number(d.hom_2012)})
	yMax = d3.max(data, function(d ){return Number(d.hom_2012)})
  
	// Define the xScale
	xScale = d3.scale.linear().domain([xMin, xMax]).range([settings.radius, settings.width - settings.radius])
	
	// Define the yScale
	yScale = d3.scale.linear().domain([yMin, yMax]).range([settings.height - 2*settings.radius,2*settings.radius])
	
	// Define the xAxis
	xAxisFunction = d3.svg.axis()
	  .scale(xScale)
	  .orient('bottom')
	  .ticks(15);
	  
	// Define the yAxis
	yAxisFunction = d3.svg.axis()
	  .scale(yScale)
	  .orient('left')
	  .ticks(15);
	  
	// Color scale
	colorScale = d3.scale.category10();
}  

// Function to build chart, appends axes, then calls the draw function for the circle elements
var build = function() {
	// Set scales
	setScales();
	
	// Append xAxis
	xAxis = d3.select('#scatter-svg').append('g').attr('class', 'axis')
	  .attr('transform', 'translate(' + settings.padding + ','+ (settings.height + settings.padding) + ')')
	  .call(xAxisFunction);
	  
  
	// Append yAxis
	yAxis = d3.select('#scatter-svg').append('g').attr('class', 'axis')
	  .attr('transform', 'translate(' + (settings.padding + settings.radius) + ',' + (settings.padding + settings.radius)+')')
	  .call(yAxisFunction);
	  
  
	// Append G in which to draw the plot
	plotG = d3.select('#scatter-svg').append('g').attr('transform', 'translate(' + (settings.padding + settings.radius) + ',' + (settings.padding +settings.radius)+ ')');
	
	// Draw legend
	drawLegend();
	
	// Draw axis labels
	drawAxisLabels();
	
	// Draw circles and axes
	draw();
}

// Circle positioning function
var circleFunc = function(circ) {
	circ
	.attr('cx', function(d) {return xScale(d.mig_2012/100,000)})
  	.attr('cy', function(d) {return yScale(d.hom_2012)})
	.attr('r', settings.radius)
	.attr('fill', function(d) {
			return colorScale(d.mig_2012)
	})
	.style('opacity', '.8')
} 


// Draw function
var draw = function() {
	// Set the scales
	setScales()
	
	// Bind data
	var circles = plotG.selectAll('circle').data(data)
	
	// Enter new elements
	circles.enter().append('circle').call(circleFunc)
	
	// Exit elements that may have left
	circles.exit().remove()
	
	// Transition all circles to new data
	plotG.selectAll('circle').transition().duration(500).call(circleFunc)
	
	// Axes
	
}	
// Draw axis labels
var drawAxisLabels = function() {
	// xAxisLabel
	xAxisLabel = d3.select('#scatter-svg').append('text').attr('transform', 'translate(' + settings.width/4 + ',' + (settings.height + settings.padding*1.8) + ')').text('Net Migration (Total # Immigrants - Total # Emigrants)')
	
	// yAxisLabel
	yAxisLabel = d3.select('#scatter-svg').append('text').attr('transform', 'translate(' + settings.padding/3 + ',' + (settings.height*7/8) + ') rotate(270)').text('Homicide Rate Per 100,000 of the Population')

	// title
	title = d3.select('#scatter-svg').append('text').attr('transform', 'translate(' + settings.width/3 + ',' + (30) + ')').text('Violence and Net Migration')
}

// Legend function
var drawLegend = function() {
	// Compare violence in migrant-receiving compared to migrant-sending countries
	var status = []
	data.map(function(d) {
		if(xValues.indexOf(d.xValues) <= 0) xValues.push(d.xValues)
	})
	
	// Append a legend G
	legendG = d3.select('#scatter-svg').append('g').attr('id', 'legendG').attr('transform', 'translate(' + (settings.width + 0.5*settings.padding) + ',' + settings.padding + ')')
	legendG.selectAll('text')
		.data(status)
		.enter().append('text')
		.text(function(d) {return d})
		.attr('transform', function(d,i) {return 'translate(0, ' + i*20 + ')'})
		.style('fill', function(d) {return colorScale(d)})
}

// Call the draw function to make the visualization
build()