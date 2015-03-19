/* global d3 */
var w = 1000,
    h = 1000;

// 1. data, no transformation, needs to be done
// 2. color scale linear
// 3. use fill
// 4. add tooltips, try d3-tip

var gridWidth = w,
    gridHeight = h;

var data = [
    { year: 0, month: 0, value: 1 },
    { year: 0, month: 1, value: 3 },
    { year: 0, month: 2, value: 2 },
    { year: 0, month: 3, value: 1 },
    { year: 0, month: 4, value: 3 },
    { year: 0, month: 5, value: 2 },
    { year: 0, month: 6, value: 1 },
    { year: 0, month: 7, value: 3 },
    { year: 0, month: 8, value: 2 },
    { year: 0, month: 9, value: 1 },
    { year: 0, month: 10, value: 3 },
    { year: 0, month: 11, value: 2 },
    { year: 1, month: 0, value: 2 },
    { year: 1, month: 1, value: 3 },
    { year: 1, month: 2, value: 3 },
    { year: 1, month: 3, value: 4 },
    { year: 1, month: 4, value: 7 },
    { year: 1, month: 5, value: 1 },
    { year: 1, month: 6, value: 6 },
    { year: 1, month: 7, value: 8 },
    { year: 1, month: 8, value: 9 },
    { year: 1, month: 9, value: 8 },
    { year: 1, month: 10, value: 9 },
    { year: 1, month: 11, value: 10 },
];

// 12 months per year, this should be ok
var cellWidth = gridWidth / 12;
// only 12 rows? 12 years must be enough for everyone :-)
var cellHeight = gridHeight / 12;

var svg = d3.select('#container')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

// interpolate fn for black-red
var colorScale = d3.scale.linear()
    // https://github.com/mbostock/d3/wiki/Arrays#d3_max
    .domain([0, 10])
    .interpolate(d3.interpolateRgb)
    .range(['#000000', '#ff0000']);

svg.selectAll('.gridCell')
    .data(data)
    .enter()
        .append('rect')
        .attr('x', function(d) {
            return d.month * cellWidth;
        })
        .attr('y', function(d) {
            return d.year * cellHeight;
        })
        .attr('rx', 4)
        .attr('ry', 4)
        .attr('width', cellWidth)
        .attr('height', cellHeight)
        .attr('fill', function(d) {
            return colorScale(d.value);
        });
