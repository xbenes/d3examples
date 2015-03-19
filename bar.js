/* global d3 */
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// 1. margins
// 2. d3 utilities: formats
// 3. d3.csv and others
// 4. d3 axes, domain, scale
// 5. axis call
// 6. range round bands
// 7. height reversing

var parseDate = d3.time.format('%Y-%m').parse;

// axis ranges, add domains later
// round bands, spacing
var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .tickFormat(d3.time.format('%Y-%m'));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(10);

var svg = d3.select('body').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    .append('g')
        .attr('transform',
            'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('bar-data.csv', function(error, data) {

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
    });

    x.domain(data.map(function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

    svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
            .style('fill', 'blue')
            .attr('x', function(d) { return x(d.date); })
            .attr('width', x.rangeBand())
            .attr('y', function(d) { return y(d.value); })
            .attr('height', function(d) { return height - y(d.value); });

});
