import {hashInnerJoin, sortedMergeInnerJoin, nestedLoopInnerJoin} from '../../lodash-joins';
import {castMembers, movies, longestMovie} from '../dataset';

let leftAccessor = x => x.movieId;
let rightAccessor = x => x.id;

export default {
    name: 'd3-array',
    tests: {
      'Hash Join': () => hashInnerJoin(castMembers, leftAccessor, movies, rightAccessor),
      'Sorted Merge Join': () => sortedMergeInnerJoin(castMembers, leftAccessor, movies, rightAccessor),
      'Nested Loop Join': () => nestedLoopInnerJoin(castMembers, leftAccessor, movies, rightAccessor)
    }
};
