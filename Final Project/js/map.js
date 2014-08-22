// Flatten map into 2-D shape
var projection = d3.geo.equirectangular()

// Set path generator to translate coordinates into a path element
var path = d3.geo.path().projection(projection)

// Draw paths
var paths = d3.select('#map-g').selectAll('path')
	.data(shape.features)
	.enter().append("path")
	.attr("fill", "#FFF")
	.attr("stroke", "#000")
	.attr('d', path)

// link data to shapefile
var mapData = {}
	
data.map(function(d) {
	mapData[d.ISO] = d.mig_2012
})
	
// Make negative scale
var values = d3.keys(mapData).map(function(d) {return mapData[d]})
var min = d3.min(values)
var max = d3.max(values)	
var scaleneg = d3.scale.linear().range(['red', 'white']).domain([min, 0])

// Make positive scale
var values = d3.keys(mapData).map(function(d) {return mapData[d]})
var min = d3.min(values)
var max = d3.max(values)	
var scalepos = d3.scale.linear().range(['white', 'blue']).domain([0.001, max])

// Fill in paths if color == true
	paths.attr('fill', function(d) {
		var iso3 = d.properties.adm0_a3
		if(mapData[iso3] == undefined) return '#d3d3d3'	
		var value = mapData[iso3]
		if (value <=0) {
			var color=scaleneg(value)
			return color
		}
		else {
			var color=scalepos(value)
			return color
		}

	})

//Format numbers

var formatter = d3.format('.3s')

//Hover
$('#map-svg path').poshytip({
		slide: false, 
		followCursor: true, 
		alignTo: 'cursor', 
		showTimeout: 0, 
		hideTimeout: 0, 
		alignX: 'center', 
		alignY: 'inner-bottom', 
		className: 'tip-twitter',
		offsetY: 10,
		
		content: function(d){
		var iso3 = this.__data__.properties.adm0_a3
		var name = this.__data__.properties.sovereignt
		// var homValue = mapData[iso3]
		var migValue = formatter(100000*mapData[iso3])
		var text = name + '<br/>' + '  Net migration: ' + migValue 
		return text
		
	}
	


})

// Create SVG element
	var svg = d3.select("#map-svg")
	
//Draw legend
	var legend = svg.append("g")
	  .attr("height", 800)
	  .attr("width", 1000)
      .attr('transform', 'translate(550,10)')      

// Append text    
	legend.append("text")
      .attr("x", -450)
      .attr("y", 10)
	  .attr("width", 300)
	  .attr("height", 400)
	  .attr("class", "titleText")
	  .text("Geographic Proximity to Hot Zones Can Moderate the Relationship")
	  
	// Append text    
	legend.append("text")
      .attr("x", -230)
      .attr("y", 370)
	  .attr("width", 800)
	  .attr("height", 400)
	  .attr("class", "rectText")
	  .text("Hover on region of interest to see country name and data.")

	  // Append text    
	legend.append("text")
      .attr("x", -450)
      .attr("y", 400)
	  .attr("width", 300)
	  .attr("height", 400)
	  .attr("class", "netSending")
	  .text("Red-hued countries are net migrant-sending countries.  The deeper the red, the more migrants flowing out.")

	  // Append text    
	legend.append("text")
      .attr("x", -450)
      .attr("y", 430)
	  .attr("width", 300)
	  .attr("height", 400)
	  .attr("class", "netReceiving")
	  .text("Blue-hued countries are net migrant-receiving countries.  The deeper the blue, the more migrants flowing in.")	  
	  
	  // Append text    
	legend.append("text")
      .attr("x", -450)
      .attr("y", 460)
	  .attr("width", 300)
	  .attr("height", 400)
	  .attr("class", "legendWhite")
	  .text("White countries have net migration near zero.  The closer to white, the nearer to net zero migration.")

	  // Append text    
	legend.append("text")
      .attr("x", -450)
      .attr("y", 490)
	  .attr("width", 300)
	  .attr("height", 400)
	  .attr("class", "legendGray")
	  .text("Gray signifies that no migration data was available for the country during the specified year.")
	  
 // Append text    
	legend.append("text")
      .attr("x", -320)
      .attr("y", 550)
	  .attr("width", 800)
	  .attr("height", 400)
	  .attr("class", "attribText")
	  .text("Net migration data are estimates for the five-year interval from 2009-2013.")

 // Append text    
	legend.append("text")
      .attr("x", -320)
      .attr("y", 580)
	  .attr("width", 800)
	  .attr("height", 400)
	  .attr("class", "attribText")
	  .text("Data from the United Nations Population Division, World Population Prospects.")
	  
// // Create SVG element
	// var svg = d3.select("#scatter-svg")

// //Draw legend
	// var legend = svg.append("g")
	  // .attr("height", 800)
	  // .attr("width", 800)
      // .attr('transform', 'translate(600,10)')      

// // Append text    
	// legend.append("text")
      // .attr("x", -450)
      // .attr("y", 170)
	  // .attr("width", 300)
	  // .attr("height", 100)
	  // .attr("class", "netSending")
	  // .text("Migrant-Sending Nations")