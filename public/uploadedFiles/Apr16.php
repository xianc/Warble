<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>PHPTest</title>
	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
	<style type="text/css">
	 body {
      padding: 30px;
      background: #000;
      
    }




	
	</style>

</head>
<body>

<?php

   // attempt a connection
 $dbh = pg_connect("host=localhost dbname=sample user=hturlapati");

  $sql = "SELECT * FROM country WHERE parent = 0";
  $result = pg_query($dbh, $sql);
  
  $arr = array();
    foreach($result as $row) {
       $sql = "SELECT * FROM country WHERE parent = {$row['id']}";
       $result2 = pg_query($dbh, $sql);
       $row["children"] = $result2;
       $arr = $row;
  }
  
// close connection
 pg_close($dbh);

?>


<script type="text/javascript">

var data = <?php echo json_encode($arr); ?>;

var w = 960;
var h = 720;
var y = 20;
var x = d3.scale.linear().range([0, w]);
var duration = 1000;
var delay = 100;
    
var hierarchy = d3.layout.partition()
    .value(function(d) { return d.age; });

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

var svg = d3.select("body").append("svg:svg")
    .attr("width", 1280)
    .attr("height", 800)
    .append("svg:g");

svg.append("svg:rect")
    .attr("class", "background")
    .attr("width", w)
    .attr("height", h);

svg.append("svg:g")
    .attr("class", "x axis");



var root = getJson();
hierarchy.nodes(root);
x.domain([0, root.value]);
down(root, 0);


function render(d) {
  var bar = svg.insert("svg:g", ".y.axis")
      .attr("class", "enter")
    .selectAll("g")
      .data(d.children)
    .enter().append("svg:g")
      .on("click", down);

  bar.append("svg:rect")
      .attr("width", function(d) { return x(d.value); })
      .attr("height", y);

  return bar;
}

function down(d, i) {
  if (!d.children || this.__transition__) return;

  var exit = svg.selectAll(".enter").attr("class", "exit");

  exit.selectAll("rect")
      .style("fill-opacity", 0);

  var enter = render(d).transition()
      .duration(duration)
      .delay(function(d, i) { return i * delay; })
      .attr("transform", function(d, i) { return "translate(0," + y * i * 1.2 + ")"; })
      .select("rect")
      .attr("width", function(d) { return x(d.value); })
      .style("fill", "purple");

  var exitTransition = exit.transition()
      .duration(duration)
      .style("opacity", 0)
      .remove();

}


function getData() {
    return data; }
    
    
function getJson() {
    return 
    {
 "name": "flare",
 "children": [
  {
   "name": "James",
   "children": [
    {
     "name": "Eric",
     "children": [
      {"name": "Lily", "age": 19},
      {"name": "Gippi", "age":20},
      {"name": "Henry", "age":10}
     ]
    },
    {
     "name": "Jack",
     "children": [
      {"name": "Nate", "age": 12},
      {"name": "Jermy", "age": 10},
      {"name": "Sima", "age":11},
      {"name": "Maya", "age":9}
     ]
    },
    {
     "name": "Gabe",
     "children": [
      {"name": "Edward", "age": 17},
      {"name": "Rosie", "age": 13}
     ]
    }
   ]
}
]
};
}

//Apr 12 2013

/*SELECT country, sum(quantity) FROM Orders GROUP BY  country --> CLICK USA 
--> SELECT state, sum(quantity) FROM orders WHERE country = "USA" GROUP BY  state

When the user clicks, then you execute the query to zoom in

Data is not rendered at the beginning. 

Country view --> while the user is doing something --> calculate state views

Buffering until it calculates the child data

Pull it in JSON  format...

Connecting to the database, and get the JSON from there, could be pre calculated for now.

/*var data = [{year: 2006, books: 54},
            {year: 2007, books: 43},
            {year: 2008, books: 41},
            {year: 2009, books: 44},
            {year: 2010, books: 35}];
            
var t = 1297110663, // start time (seconds since epoch)
    v = 70, // start value (subscribers)
    //data = d3.range(33).map(next); // starting dataset
    data = [{"time": 1297110663, "value": 56},
{"time": 1297110664, "value": 53},
{"time": 1297110665, "value": 58},
{"time": 1297110666, "value": 58}];


/*function next() {
  return {
    time: ++t,
    value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
  };
}

            
var w = 20,
    h = 80;

var x = d3.scale.linear()
    .domain([0, 1])
    .range([0, w]);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([0, h]);
    
var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 420)
    .attr("height", data.length * 20);

            
function redraw() {

  var rect = chart.selectAll("rect")
      .data(data, function(d) { return d.time; });
      
 

 rect.enter().insert("rect", "line")
      .attr("x", function(d, i) { return x(i + 1) - .5; })
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("width", w)
      .attr("height", function(d) { return y(d.value); })
    .transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5; });
      
   rect.enter().append("rect");
        
       

      

  rect.transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5; });

  rect.exit().transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i - 1) - .5; })
      .remove();

}
redraw();
setInterval(function() {
  data.shift();
 // data.push(next());
  redraw();
}, 1500);




/*var barWidth = 40;
var width = (barWidth + 10) * data.length;
var height = 200;

var x = d3.scale.linear().domain([0, data.length]).range([0, width]);
var y = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum.books; })]).
  rangeRound([0, height]);

// add the canvas to the DOM
var barDemo = d3.select("body").
  append("svg:svg");
  
function render(){
  
  barDemo.
  attr("width", width).
  attr("height", height);

barDemo.selectAll("rect").
  data(data).
  enter().
  append("svg:rect").
  on("click", clickEvent).
  attr("x", function(datum, index) { return x(index); }).
  attr("y", function(datum) { return height - y(datum.books); }).
  attr("height", function(datum) { return y(datum.books); }).
  attr("width", barWidth).
  attr("fill", "#2d578b");
  
barDemo.selectAll("text").
  data(data).
  enter().
  append("svg:text").
  attr("x", function(datum, index) { return x(index) + barWidth; }).
  attr("y", function(datum) { return height - y(datum.books); }).
  attr("dx", -barWidth/2).
  attr("dy", "1.2em").
  attr("text-anchor", "middle").
  text(function(datum) { return datum.books;}).
  attr("fill", "white");
  
barDemo.selectAll("text.yAxis").
  data(data).
  enter().append("svg:text").
  attr("x", function(datum, index) { return x(index) + barWidth; }).
  attr("y", height).
  attr("dx", -barWidth/2).
  attr("text-anchor", "middle").
  text(function(datum) { return datum.year;})
  attr("fill", "white");
}
render();

function clickEvent(i) {
    var op = prompt("Please enter the value", "");
    data[i].books == parseInt(op, 10);
    render();
    
};

d3.select("button").on("click", function(d, i) {
    var yr = prompt("Please enter the year", "");
    var bo = prompt("Please enter the num of books","");
    var newYear = parseInt(yr, 10);
    var newData = parseInt(bo, 10);
    if (!isNaN(newData) && !isNaN(newYear)) {
      data[data.length].year = newYear;
      data[data.length].books = newData;
      render();
    }
});*/

 
  
</script>
</body>
</html>