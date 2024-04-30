// Define the dimensions for the SVG
var margin = {top: 30, right: 30, bottom: 70, left: 100},
    w = 1300- margin.left - margin.right,
    h = 600 - margin.top - margin.bottom;
var barPadding = 1;

// Load the CSV data
d3.csv("https://gist.githubusercontent.com/AllenHo2/d049ea2fcf61c90a9b220f6693881e40/raw/643ed2db8210a15fbba086084d72da989bea23e2/AQI.csv")
  .then(function(data) {

    var dotsVisible = true;
    // Create the SVG element
    var svg = d3.select("#lineChart")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales for x and y axes
    const x = d3.scaleBand()
      .domain( data.map(function (d) { return d['Years']; }))
      .range([0, w])
      svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(x))

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => (+d["AQI"]))])
      .nice()
      .range([h, 0]);
    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y))
      
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("class", "line")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(d => (x(+d["Years"]) + 10))
        .y(d => (y(+d["AQI"])))
        )

    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("fill", "red")
        .attr("cx", d => (x(+d["Years"]) + 10))
        .attr("cy", d => (y(+d["AQI"])))
        .attr("r", 6)
        .style("stroke", "black")
        .append("title")
        .text(d => ("AQI: " + (+d["AQI"]) + " Year: " + (d["Years"])));
   
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

      //   function zoomed(event) {
      //     svg.attr("transform", event.transform);
      //     svg.select(".x.axis").call(d3.axisBottom(x).scale(event.transform.rescaleX(x)));
      //     svg.select(".y.axis").call(d3.axisBottom(x).scale(event.transform.rescaleX(y)));
      // }

      //   // Define zoom behavior
      //   var zoom = d3.zoom()
      //       .scaleExtent([1, 10])
      //       .on("zoom", zoomed);

      //   // Apply zoom behavior to the SVG
      //   svg.call(zoom);

  // Function to toggle visibility of dots
        function toggleDotsVisibility() {
          if (dotsVisible) {
              svg.selectAll(".dot").style("display", "none");
          } else {
              svg.selectAll(".dot").style("display", "block");
          }
          dotsVisible = !dotsVisible; // Toggle visibility state
      }


      var button = document.createElement("button");
      button.textContent = "Dots Visibility";
      button.addEventListener("click", toggleDotsVisibility);
      document.getElementById("lineChart").appendChild(button);
  })