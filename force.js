/* global d3 */

var w = 1000,
    h = 1000;

// 1. graph representation: nodes, links
//    + texts, circles, edges (graphical repre)
// 2. force field definition
// 3. tick function, passing parameters
// 4. on-tick magic, cross-section computation
// 5. circles.call(force.drag);

var nodes = [
    {
        name: 'a',
        color: '#ff0000'
    },
    {
        name: 'b',
        color: '#ffff00'
    },
    {
        name: 'c',
        color: '#00ff00'
    },
    {
        name: 'd',
        color: '#0000ff'
    },
    {
        name: 'e',
        color: '#00ffff'
    },
    {
        name: 'f',
        color: '#ff00ff'
    }
];

var links = [
    { source: 0, target: 1 },
    { source: 1, target: 3 },
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 4 },
    { source: 4, target: 5 }
];


var svg = d3.select('#container')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

var texts = svg.selectAll('text')
    .data(nodes)
    .enter()
        .append('text')
        .attr('fill', 'black')
        .text(function(d) { return d.name; });

var circles = svg.selectAll('circle')
    .data(nodes)
    .enter()
        .append('circle')
        .attr('r', 20)
        .attr('opacity', 0.5)
        .style('fill', function(d) { return d.color; });

var edges = svg.selectAll('line')
    .data(links)
    .enter()
        .append('line')
        .style('stroke', '#ccc')
        .style('stroke-width', 2);
    //    .attr('marker-end', 'url(#end)');

// note that force field is defined with plain graph repre objects,
// not the svg elements created
var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([w,h])
    .linkDistance([250])
    .charge([-1500])
    .gravity(0.3)
    .start();


force.on('tick', function() {
    // d.source.x, d.x populated by d3
    edges.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });
    circles.attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });
    texts.attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
    });
});
