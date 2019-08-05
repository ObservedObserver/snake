import React, { useState, useEffect } from 'react';
import { position } from '../index.d';
import { add } from '../lib/matrix';
import { die } from '../lib/judge';
import { throwFood, eatFood } from '../lib/food';
import { BBox, SnakeSpace } from '../index.d';
import './snake.css';

const BLOCK_SIZE = 10;

interface SnakeProps {
  length: number;
  playground: BBox;
  mode: 'easy' | 'medium' | 'hard' | 'crazy'
}
const moveTo: {
  top: position;
  bottom: position;
  left: position;
  right: position;
  [key: string]: any
} = {
  top: [0, -1],
  bottom: [0, 1],
  left: [-1, 0],
  right: [1, 0]
}
const modeSpeed: {[key: string]: number} = {
  easy: 1000,
  medium: 500,
  hard: 200,
  crazy: 50
}
const COLOR: {[key: string]: string} = {
  snake: '#d4380d',
  background: '#f4ffb8',
  food: '#eb2f96'
}
const Snake: React.FC<SnakeProps> = (props: SnakeProps) => {
  const { playground, mode } = props;
  const initSpace: SnakeSpace = [
    [
      Math.round((playground[0][0] + playground[1][0]) / 2),
      Math.round((playground[0][1] + playground[1][1]) / 2)
    ]
  ];
  initSpace.push([initSpace[0][0] + 1, initSpace[0][1]])
  const [space, setSpace] = useState(initSpace);
  const [direction, setDirection] = useState(moveTo.top);
  const initFood: position = throwFood(space, playground);
  const [food, setFood] = useState(initFood);
  // const currentDirection = useRef(direction);

  useEffect(() => {
    const round = setInterval(() => {
      setSpace((space) => {
        if (die(space, playground)) {
          clearRound();
          console.log('die!!');
          return [];
        }
        let newSpace: SnakeSpace;
        newSpace = [
          add(space[0], direction),
          ...space.slice(0, -1)
        ];
        if (eatFood(space, food)) {
          newSpace.push(space[space.length - 1]);
          console.log('eat', space, newSpace)
          setFood(throwFood(newSpace, playground));
        }
        return newSpace;
      });
    }, modeSpeed[mode]);
    const clearRound = () => {
      clearInterval(round);
      setSpace(initSpace);
    }
    return () => {
      console.log('unmount')
      clearInterval(round);
    }
  }, [direction, food, mode]);

  useEffect(() => {
    const keyMap: { [key: string]: string } = {
      A: 'left',
      W: 'top',
      S: 'bottom',
      D: 'right'
    }
    const keyHandler = (e: KeyboardEvent) => {
      let key = String.fromCharCode(e.keyCode);
      if (key in keyMap) {
        setDirection(moveTo[keyMap[key]]);
      }
    }
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler);
    }
  }, [])
  const width = BLOCK_SIZE * (playground[1][0] - playground[0][0]);
  const height = BLOCK_SIZE * (playground[1][1] - playground[0][1]);
  return (
    <div className="snake-playground" style={{ width, height, backgroundColor: COLOR.background }}>
      <svg width={width} height={height}>
      <rect x={food[0] * BLOCK_SIZE} y={food[1] * BLOCK_SIZE} width={BLOCK_SIZE} height={BLOCK_SIZE} style={{fill: COLOR.food}} />
      <g style={{ fill: COLOR.snake }}>
      {
        space.map((cell, index) => {
          return <rect key={`cell-${index}`} x={cell[0] * BLOCK_SIZE} y={cell[1] * BLOCK_SIZE} width={BLOCK_SIZE} height={BLOCK_SIZE} />
        })
      }
      </g>
      </svg>
    </div>
  )
}

export default Snake;
