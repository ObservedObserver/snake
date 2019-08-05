import { position } from '../index.d'
function add(vec1: position, vec2: position): position {
  return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
}
function equal(vec1: position, vec2: position): boolean {
  return vec1[0] === vec2[0] && vec1[1] === vec2[1];
}
function multiply(vec: position, k: number): position {
  const result = vec.map(a => a * k)
  return [result[0], result[1]];
}

export { add, multiply, equal };