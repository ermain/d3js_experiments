import React from 'react';
import { render } from 'react-dom';
import {forceSimulation} from '../lib/d3-force';
import {forceCollide} from '../lib/d3-force';

var width = window.innerWidth;
var height = window.innerHeight;
var nodes = d3.range(1000).map(function () { return {r: Math.random() * 12 + 4}; }),
  root = nodes[0];
root.r = 100;
root.fixed = true;
const forceX = d3.forceX(width / 2).strength(0.015);
const forceY = d3.forceY(height / 2).strength(0.015);

var force = forceSimulation()
  .velocityDecay(0.2)
  .force('x', forceX)
  .force('y', forceY)
  .force('collide', forceCollide().radius(function (d) {
    if(d === root) {
      return d.r + 0.5;
    }
    return d.r + 0.5;
  }).iterations(5))
  .nodes(nodes).on('tick', ticked);
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);
svg.selectAll('circle')
  .data(nodes)
  .enter().append('circle')
  .attr('r', function (d) { return d.r; });
function ticked (e) {
  svg.selectAll('circle')
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; });
}
svg.on('mousemove', function () {
  var p1 = d3.mouse(this);
  root.fx = p1[0];
  root.fy = p1[1];
  force.alphaTarget(0.3).restart();//reheat the simulation
});
