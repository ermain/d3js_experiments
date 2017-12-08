import {nestedLoopJoin, sortMergeJoin, hashJoin} from '../../d3-array-benchmark/index';
import {castMembers, movies, longestMovie} from '../dataset';

let leftAccessor = x => x.movieId;
let rightAccessor = x => x.id;

export default {
    name: 'd3-array',
    tests: {
      'Hash Join': () => hashJoin(castMembers, leftAccessor, movies, rightAccessor),
      'Sorted Merge Join': () => sortMergeJoin(castMembers, leftAccessor, movies, rightAccessor),
      'Nested Loop Join': () => nestedLoopJoin(castMembers, leftAccessor, movies, rightAccessor)
    }
};
