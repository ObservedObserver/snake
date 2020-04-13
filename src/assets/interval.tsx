import { useState, useEffect } from 'react';

export const MODE_SPEED = {
  easy: 1000,
  medium: 500,
  hard: 200,
  crazy: 50,
};

export type MODES = keyof typeof MODE_SPEED;

export function useInterval(mode: MODES, round: number): number {
  const [clock, setClock] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setClock(c => c + 1);
    }, MODE_SPEED[mode]);
    return () => {
      clearInterval(interval);
    }
  }, [mode, round])
  return clock;
}
