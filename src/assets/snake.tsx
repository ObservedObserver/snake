import React, { useState, useEffect } from 'react';
import { position } from '../index.d';
import { add } from '../lib/matrix';
import { die } from '../lib/judge';
import { BBox, SnakeSpace } from '../index.d';
import './snake.css';

const BLOCK_SIZE = 10;

interface SnakeProps {
  length: number;
  playground: BBox
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
  right: [0, 1]
}
const Snake: React.FC<SnakeProps> = (props: SnakeProps) => {
  const { playground } = props;
  const initSpace: SnakeSpace = [
    [
      Math.round((playground[0][0] + playground[1][0]) / 2),
      Math.round((playground[0][1] + playground[1][1]) / 2)
    ]
  ];
  const [space, setSpace] = useState(initSpace);
  const [direction, setDirection] = useState(moveTo.top);
  // const currentDirection = useRef(direction);

  useEffect(() => {
    const round = setInterval(() => {
      setSpace((space) => {
        if (die(space, playground)) {
          clearRound();
          console.log('die!!');
          return [];
        }
        const newSpace = [add(space[0], direction),
          ...space.slice(1).map((cell, index) => space[index - 1])
        ];
        return newSpace;
      });
    }, 500);
    const clearRound = () => {
      clearInterval(round);
      setSpace(initSpace);
    }
    return () => {
      console.log('unmount')
      clearInterval(round);
    }
  }, [direction]);

  useEffect(() => {
    const keyMap: { [key: string]: string } = {
      A: 'left',
      W: 'top',
      S: 'bottom',
      D: 'right'
    }
    const keyHandler = (e: KeyboardEvent) => {
      console.log('l')
      let key = String.fromCharCode(e.keyCode);
      if (key in keyMap) {
        console.log(moveTo[keyMap[key]])
        setDirection(moveTo[keyMap[key]]);
      }
    }
    console.log(true)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler);
    }
  }, [])
  const width = BLOCK_SIZE * (playground[1][0] - playground[0][0]);
  const height = BLOCK_SIZE * (playground[1][1] - playground[0][1]);
  return (
    <div className="snake-playground" style={{ width, height}}>
      {
        space.map((cell, index) => {
          return <div key={`cell-${index}`} className="snake-cell" style={{ left: cell[0] * BLOCK_SIZE, top: cell[1] * BLOCK_SIZE }} />
        })
      }
    </div>
  )
}

export default Snake;
