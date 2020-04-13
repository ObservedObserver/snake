import { SnakeSpace, position, BBox } from "../types";
import { equal } from './matrix';

function throwFood (space: SnakeSpace, playground: BBox): position {
  const [[left, top], [right, bottom]] = playground;
  let food: position = [
    left + Math.round(Math.random() * (right - left)),
    top + Math.round(Math.random() * (bottom - top))
  ];
  // eslint-disable-next-line
  while (space.findIndex(cell => equal(food, cell)) > -1) {
    food = [
      left + Math.round(Math.random() * (right - left)),
      top + Math.round(Math.random() * (bottom - top))
    ];
  }
  return food;
}

function eatFood (space: SnakeSpace, food: position): boolean {
  return equal(space[0], food);
}

export { throwFood, eatFood }