// Define the dimensions for the SVG
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    w = 1300- margin.left - margin.right,
    h = 600 - margin.top - margin.bottom;
var barPadding = 1;

// Load the CSV data
d3.csv("https://gist.githubusercontent.com/AllenHo2/31a1cde4e1ff72b994ede5e42ec59bc1/raw/ec948ebf8d826a2746db3370fcd7c53d81a832e3/expensive.csv")
  .then(function(data) {

    var myColor = d3.scaleLinear()
    .domain([85,170])
    .range(["white", "blue"])
    // Create the SVG element
    var svg = d3.select("#newChart")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales for x and y axes
    var x = d3.scaleBand()
      .domain(data.map(function(d) { return d["State"]; }))
      .range([0, w])
      .padding(0.2); // Adjust padding as needed

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d["groceryCost"] * 1.25; })])
      .nice()
      .range([h, 0]);

    // Create bars
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr('class', 'bar')
      .attr("x", function(d) { 
        return x(d["State"]);
       })
      .attr("y", function(d) { 
        return y(d["groceryCost"]) ; 
       })
      .attr("width", x.bandwidth())
      .attr("height",d => (h - y(d["groceryCost"])))

      .attr("fill", function(d) {
        return myColor(d["groceryCost"]);
      })
      .append("title")
      .text( d => "$ " + d["groceryCost"]);

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate( 0 , " + h + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", 8)
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
    .text("Average Cost of Groceries")
    .style("font-size", "20px");

  svg.append("text")
    .attr("x", w / 2)
    .attr("y", h + margin.bottom / 2)
    .attr("text-anchor", "middle")
    .text("This chart is the better because the colors are sequential in proportion to the cost, there's a scale, and no text cluttering. The chart is also more spread out to allow better readibility. There is also tooltips to guide viewers on what the actual cost is.")
    .style("font-size", "14px");

  svg.append("g")
    .attr("class", "legendSequential")
    .attr("transform", "translate(2800,20)");

  svg.append("text")
    .attr("transform", "translate(2775,5)")
    .style("font-size", '12px')
    .text("Average Cost of Groceries");

  var legendSequential = d3.legendColor()
  .shapeWidth(30)
  .cells(10)
  .orient("vertical")
  .scale(myColor);

  svg.select(".legendSequential")
    .call(legendSequential);
  })