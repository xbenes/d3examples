/* global d3 */
var w = 1000,
    h = 1000;

// 0. svg-only
// 1. .append - to existing element
//    (#container needs to exist)
// 2. .attr
// 3. return 'this'

var svg = d3.select('#container')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

var text = svg
    .append('text')
    .text('hello world')
    .attr('y', 50);

