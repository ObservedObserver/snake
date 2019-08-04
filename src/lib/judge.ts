import { SnakeSpace, BBox } from '../index.d';

function bbox(space: SnakeSpace): BBox {
  let left = Math.min(...space.map(item => item[0]));
  let top = Math.min(...space.map(item => item[1]));
  let right = Math.max(...space.map(item => item[0]));
  let bottom = Math.max(...space.map(item => item[1]));
  return [[left, top], [right, bottom]];
}

function suicide(space: SnakeSpace): boolean {
  let set = new Set();
  for (let i = 0; i < space.length; i++) {
    let key = space[i][0] + '-' + space[i][1];
    if (set.has(key)) {
      return true;
    }
    set.add(key)
  }
  return false;
}

function die(space: SnakeSpace, playground: BBox): boolean {
  if (suicide(space)) {
    console.log('suicide')
    return true;
  }
  const [[left, top], [right, bottom]] = bbox(space);
  const [[LEFT, TOP], [RIGHT, BOTTOM]] = playground;
  if (left >= LEFT && right <= RIGHT && top >= TOP && bottom <= BOTTOM) {
    return false;
  }
  return true;
}

export { die };