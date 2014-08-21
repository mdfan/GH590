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
	
// Make scale
var values = d3.keys(dataMap).map(function(d) {return dataMap[d].mean})
var min = d3.min(values)
var max = d3.max(values)	
var scale = d3.scale.linear().range(['blue', 'red']).domain([min, max])

// create map data variable
//var mapData = data.map(function(d) {
	//mapData[d.ISO] = d.mig_2012
//})

// Fill in paths if color == true
	paths.attr('fill', function(d) {
		var iso3 = d.properties.adm0_a3
		var value = mapData[iso3]
		if (value == undefined) return '#d3d3d3'
		
		var color = scale(value)
		return color
	})		
	
	
// Add hovers if hover == true
//if(hover == "draw") {
	//$('#map-svg path').poshytip({
		//slide: false, 
		//followCursor: true, 
		//alignTo: 'cursor', 
		//showTimeout: 0, 
		//hideTimeout: 0, 
		//alignX: 'center', 
		//alignY: 'inner-bottom', 
		//className: 'tip-twitter',
		//offsetY: 10,
		//content: function(d){
			//var obj = this.__data__
			//var name = obj.properties.brk_name
			//var iso3 = obj.properties.adm0_a3
			//mean = dataMap[iso3] == undefined ? '' : dataMap[iso3].mean
			//return name + ' ' + mean
//		}
	//})
//}