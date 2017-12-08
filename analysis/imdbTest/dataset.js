//SELECT COUNT(person_id) FROM cast_members WHERE movie_id =
//  (SELECT id from movies WHERE runtime = (SELECT MAX(runtime) from movies));
import * as arrays from '../d3-array-benchmark/';
import {csvParse, dsvFormat} from 'd3-dsv';
import fs from 'fs';

let data = fs.readFileSync('./movies.csv', {encoding:'utf8'})
let movies = csvParse(data);
data = fs.readFileSync('./castMembers.csv', {encoding:'utf8'})
let castMembers = dsvFormat('|').parseRows(data, d => {
  return {movieId: d[0], id: d[1]};
})

let longestMovie = movies.reduce((x,y) => parseInt(x.runtime) > parseInt(y.runtime) ? x : y, 0);

export {castMembers, movies, longestMovie};
