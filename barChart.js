// Define the dimensions for the SVG
var margin = { top: 30, right: 30, bottom: 70, left: 100 },
  w = 1300 - margin.left - margin.right,
  h = 600 - margin.top - margin.bottom;
var barPadding = 1;

// Load the CSV data
d3.csv('https://gist.githubusercontent.com/AllenHo2/c288bda2f9cfe4a2d9223c1e703f97dc/raw/218cf6af00ba68eea250134c17a8c3ef7bfc4347/Hunting_License%2520-%2520hunting_license_tags_permits_and_stamps_usafacts%2520(1).csv').then(function (data) {
  // var sequentialScale = d3.scaleSequential(d3.interpolateRainbow)
  // .domain([0,100]);

  // Create the SVG element
  var svg = d3
    .select('#barChart')
    .append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
    .append('g')
    .attr('transform',`translate(${margin.left},${margin.top})`,);

  var myColor = d3
    .scaleLinear()
    .domain([25000000, 50000000])
    .range(['white', 'blue']);

  // Define scales for x and y axes
  var x = d3
    .scaleBand()
    .domain(
      data.map(function (d) { return d['Years']; }))
    .range([0, w])
    .padding(0.2); // Adjust padding as needed

  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, function (d) { return d['License'] * 1.25; })])
    .nice()
    .range([h, 0]);

  //   console.log(x(d["Years"]));
  // Create bars
  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) {return x(d['Years']);})
    .attr('y', function (d) {return y(d['License']);})
    .attr('width', x.bandwidth())
    .attr('height',(d) => h - y(d['License']))
    .attr('fill', function (d) {return myColor(d['License']);})
    .append('title')
    .text((d) => d['License'] + ' license');

  svg
    .append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate( 0 , ' + h + ')')
    .call(d3.axisBottom(x))
    .selectAll('text')
    .style('font-size', 10)
    .style('fill', '0');

  var yAxis = d3.axisLeft().scale(y);
  svg.append('g').attr('class', 'axis').call(yAxis);

  svg
    .append('g')
    .attr('class', 'legendSequential')
    .attr('transform', 'translate(1000,20)');

  svg
    .append('text')
    .attr('transform', 'translate(1000,5)')
    .style('font-size', '12px')
    .text("# of License");

  var legendSequential = d3
    .legendColor()
    .shapeWidth(30)
    .cells(6)
    .orient('vertical')
    .scale(myColor);

  svg.select('.legendSequential').call(legendSequential);

    
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (h / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Average Air Quality Index experienced by Humans");

  svg.append("text")
  .attr("transform", "translate(" + (w/2) + " ," + (h + margin.top + 20) + ")")
  .style("text-anchor", "middle")
  .text("Year");
});
