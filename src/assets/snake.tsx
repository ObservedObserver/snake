import React, { useState, useEffect, useMemo, useRef } from 'react';
import { position } from '../types';
import { add, isOpposite } from '../lib/matrix';
import { die } from '../lib/judge';
import { throwFood, eatFood } from '../lib/food';
import { BBox, SnakeSpace } from '../types';
import { MODES, useInterval } from './interval';

import './snake.css';

const BLOCK_SIZE = 10;

interface SnakeProps {
  length: number;
  playground: BBox;
  mode: MODES
}
enum DIRECTIONS {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right'
}

const MOVE_TO: {
  [key in DIRECTIONS]: [number, number]
} = {
  top: [0, -1],
  bottom: [0, 1],
  left: [-1, 0],
  right: [1, 0]
}

const keyMap: { [key: string]: DIRECTIONS } = {
  A: DIRECTIONS.left,
  W: DIRECTIONS.top,
  S: DIRECTIONS.bottom,
  D: DIRECTIONS.right,
};

const COLOR: {[key: string]: string} = {
  snake: '#d4380d',
  background: '#f4ffb8',
  food: '#eb2f96'
}

const Snake: React.FC<SnakeProps> = (props: SnakeProps) => {
  const { playground, mode } = props;
  const [space, setSpace] = useState<Array<[number, number]>>([[0, 0]]);
  const [food, setFood] = useState<position>([0, 0]);
  const [round, setRound] = useState<number>(1);
  const direction = useRef<DIRECTIONS>(DIRECTIONS.top);

  const clock = useInterval(mode, round);

  // 初始化蛇的位置状态和食物的位置状态
  const initSpace = useMemo(() => {
    const initSpace: SnakeSpace = [
      [
        Math.round((playground[0][0] + playground[1][0]) / 2),
        Math.round((playground[0][1] + playground[1][1]) / 2),
      ],
    ];
    initSpace.push([initSpace[0][0] + 1, initSpace[0][1]]);
    return initSpace;
    // eslint-disable-next-line
  }, [playground, round])

  const initFood = useMemo(() => {
    return throwFood(initSpace, playground);
  }, [initSpace, playground]);

  useEffect(() => {
    setSpace(initSpace);
    setFood(initFood)
  }, [initSpace, initFood])

  useEffect(() => {
    setSpace((space) => {
      if (die(space, playground)) {
        setRound(r => r + 1);
        console.log("die!!");
        return [];
      }
      let newSpace: SnakeSpace;
      newSpace = [add(space[0], MOVE_TO[direction.current]), ...space.slice(0, -1)];
      if (eatFood(space, food)) {
        newSpace.push(space[space.length - 1]);
        console.log("eat", space, newSpace);
        setFood(throwFood(newSpace, playground));
      }
      return newSpace;
    });
  // eslint-disable-next-line
  }, [clock])

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      let key = String.fromCharCode(e.keyCode);
      if (
        key in keyMap &&
        !isOpposite(MOVE_TO[keyMap[key]], MOVE_TO[direction.current])
      ) {
        direction.current = keyMap[key];
      }
    }
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler);
    }
  }, [])
  console.log('render')
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
