// Define the dimensions for the SVG
var margin = {top: 30, right: 100, bottom: 70, left: 100},
    w = 1300- margin.left - margin.right,
    h = 600 - margin.top - margin.bottom;
var barPadding = 1;

// Load the CSV data
d3.csv("https://gist.githubusercontent.com/AllenHo2/bc5f32e18e66cac9041831a3ae10703d/raw/1bd86f73817d49e0de73519930f768d5c350b3db/Gas_vs_AQI.csv")
  .then(function(data) {

    // Create the SVG element
    var svg = d3.select("#scatterPlot")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales for x and y axes
    var x = d3.scaleBand()
      .domain(data.map(function(d) { return Math.floor(+d["AQI"]); }).reverse()) // Floor the AQI values
      .range([0, w])
      .padding(0.2); // Adjust padding as needed

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d["Gas"] })])
      .nice()
      .range([h, 0]);

  // Draw circles for each data point
  svg
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', (d) =>x(Math.floor(+d["AQI"])) + Math.random() * x.bandwidth() / 2)
    .attr('cy', (d) => y(+d['Gas']))
    .attr('r', 10)
    .attr('fill',(d) => 'red')
    .style("stroke", "black")
    .append('title')
    .text((d) =>'GreenHouse Gas Emission: ' +d['Gas'] +', AQI: ' +d['AQI'] +', Year: ' +d['Years']);

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
    .attr("y", h + margin.bottom / 2)
    .attr("text-anchor", "middle")
    .text("")
    .style("font-size", "14px");


    svg.append("text")
    .attr("transform", "translate(" + (w/2) + " ," + (h + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Average Air Quality Index experienced by Humans");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("GreenHouse Gas Emissions in tons");

  
      // Calculate regression line
      var xValues = data.map(d => Math.floor(+d["AQI"]));
      var yValues = data.map(d => +d['Gas']);
      var regression = d3.regressionLinear()(xValues.map((d, i) => [d, yValues[i]]));
  
      // Draw regression line
      svg.append("line")
        .attr("class", "regression-line")
        .attr("x1", x(regression[0][0]))
        .attr("y1", y(regression[0][1]))
        .attr("x2", x(regression[1][0]))
        .attr("y2", y(regression[1][1]))
        .style("stroke", "blue")
        .style("stroke-width", 2);
  })












