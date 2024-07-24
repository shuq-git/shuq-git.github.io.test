function main(){
    
    //Create the svg. Because I don't like chaining, use variable names instead
    var svg = d3.select("svg"),

    margin = 200, 
    width = svg.attr("width") - margin,
    height = svg.attr("height") -margin;

    var xScale = d3.scaleBand().range([0, width]).padding(0.4);
    var yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g").attr("transform", "translate("+100+","+100+")");

    d3.csv("https://shuq-git.github.io/systems.csv").then(function(data){
        

        xScale.domain(data.map(function(d){return d.system;}));
        yScale.domain([0, d3.max(data, function(d){return d.total_inmate_cases;})]);
    

        g.append("g").attr("transform","translate(0,"+height+"0)")
            .call(d3.axisBottom(xScale))

        g.append("g").call(d3.axisLeft(yScale).ticks(10));


//Now, let's create the graph
    g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d){return xScale(d.system);})
            .attr("y", function(d){return yScale(d.total_inmate_cases);})
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){return height - yScale(d.total_inmate_cases);});


    });
}

