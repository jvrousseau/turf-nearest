var nearest = require('./');
var index = require('turf-index');
var Benchmark = require('benchmark');
var fs = require('fs');

var pt = JSON.parse(fs.readFileSync(__dirname+'/geojson/pt.geojson'));
var pts = JSON.parse(fs.readFileSync(__dirname+'/geojson/pts.geojson'));
var index_pts = index(pts, 'rtree');

var suite = new Benchmark.Suite('turf-nearest');

suite
  .add('turf-nearest (non-indexed)',function () {
    nearest(pt, pts);
  })
  .add('turf-nearest (indexed)',function () {
      nearest(pt, index_pts);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {

  })
  .run();
