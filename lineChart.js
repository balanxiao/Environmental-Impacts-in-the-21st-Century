// Define the dimensions for the SVG
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    w = 1300- margin.left - margin.right,
    h = 600 - margin.top - margin.bottom;
var barPadding = 1;

// Load the CSV data
d3.csv("https://gist.githubusercontent.com/AllenHo2/d049ea2fcf61c90a9b220f6693881e40/raw/643ed2db8210a15fbba086084d72da989bea23e2/AQI.csv")
  .then(function(data) {

    // Create the SVG element
    var svg = d3.select("#lineChart")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales for x and y axes
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => (+d["Years"])))
      .range([0, w])
      svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(x))

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => (+d["AQI"]))])
      .range([h, 0]);
    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y))

      
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(d => (x(+d["Years"])))
        .y(d => (y(+d["AQI"])))
        )

    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("fill", "red")
        .attr("cx", d => (x(+d["Years"])))
        .attr("cy", d => (y(+d["AQI"])))
        .attr("r", 6)
        .append("title")
        .text(d => ("AQI: " + (+d["AQI"]) + " Year:" + (d["Years"])));
   
      svg.append("text")
      .attr("transform", "translate(" + (w/2) + " ," + (h + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Year");
  
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (h / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Average Air Quality Index experienced by Humans");
  })