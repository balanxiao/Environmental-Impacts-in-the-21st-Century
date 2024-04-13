// Define the dimensions for the SVG
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    w = 1200- margin.left - margin.right,
    h = 600 - margin.top - margin.bottom;
var barPadding = 1;

// Load the CSV data
d3.csv("https://gist.githubusercontent.com/AllenHo2/08ef71bfb664e7aa73bc8a9b39423d58/raw/25df4d417264da8391847bb45ace2eb21b2c927f/Billionaires.csv%2520-%2520billionaires.csv%2520(1).csv")
  .then(function(data) {

    // Create the SVG element
    var svg = d3.select("#dotPlot")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales for x and y axes
    var x = d3.scaleBand()
      .domain(data.map(function(d) { return d["company.name"]; }))
      .range([0, w])
      .padding(0.2); // Adjust padding as needed

    var y = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d["company.founded"] }), d3.max(data, function(d) { return d["company.founded"] })])
      .nice()
      .range([h, 0]);

  // Draw circles for each data point
  svg
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', (d) =>x(d['company.name']) + 44)
    .attr('cy', (d) => y(+d['company.founded']))
    .attr('r', 10)
    .attr('fill',(d) =>'rgb(0, 0, ' +Math.round(+d['company.founded'] * 10) +')')
    .append('title')
    .text((d) =>'Year Founded: ' +d['company.founded'] +', Company: ' +d['company.name']);

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate( 0 , " + h + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", 10)
      .style("fill", "0");

    var yAxis = d3.axisLeft()
                  .scale(y)
    svg.append("g")
    .attr("class", "axis")
    .call(yAxis);

    svg.append("text")
    .attr("x", w / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("New Dot Plot of Companies Year's Founded")
    .style("font-size", "20px");

  svg.append("text")
    .attr("x", w / 2)
    .attr("y", h + margin.bottom / 2)
    .attr("text-anchor", "middle")
    .text("")
    .style("font-size", "14px");
  })












