/* global d3, _ */

var w = 1000,
    h = 1000;

// 1. data with positions
//    - show demo
//    - function(d) {}

// 2. labeled circles (svg g - group)
//    - enable subset + exit

// 3. enable update using randomize
// 4. transition (+ .duration)


var svg = d3.select('#container')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

var allEntities = [
    { id: 1, name: 'a', position: { x: 100, y: 100 } },
    { id: 2, name: 'b', position: { x: 150, y: 100 } },
    { id: 3, name: 'c', position: { x: 200, y: 100 } },
    { id: 4, name: 'd', position: { x: 250, y: 100 } },
    { id: 5, name: 'e', position: { x: 300, y: 100 } },
    { id: 6, name: 'f', position: { x: 350, y: 100 } }
];

setInterval(function() {

    //randomizePositions();
    var data = allEntities;//getSubset();

    // bind data, note that '.letter' may not exist yet!
    var letters = svg.selectAll('.letter').data(data, function(obj) {
        return obj.id;
    });

    // enter!
    var circleGroup = letters.enter()
        .append('g')
        // mark for updates in selectAll
        .attr('class', 'letter')
        .attr('transform', function(d){
            return 'translate(' +
              d.position.x +
              ',' +
              d.position.y +
              ')';
        });

    circleGroup.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 20)
        .attr('fill', '#ffff00');
    circleGroup.append('text')
        .text(function(d) {
            return d.name;
        });

    // exit!
    //letters.exit().remove();

    // update!
//    letters
//        //.transition()
//        .attr('transform', function(d){
//            return 'translate(' +
//              d.position.x +
//              ',' +
//              d.position.y +
//              ')';
//        });

}, 1000);

// ----------------------------------------------
var randomizePositions = function() {
    allEntities.forEach(function(entity) {
        entity.position.x = Math.round(Math.random() * w);
        entity.position.y = Math.round(Math.random() * h);
    });
};

var getSubset = function() {
    var numberOfElements = Math.floor(Math.random() * allEntities.length);
    return _.sample(allEntities, numberOfElements);
};

