import React, {
  ReactElement,
  FC,
  useState,
  useRef,
  useEffect,
} from 'react';
import cn from 'classnames';

import { formatTimeValue } from './utils';

interface TimerProps {
  isGameRunning: boolean;
  isGameFinished: boolean;
  dispatch: Function;
}

const Timer: FC<TimerProps> = (
  { isGameRunning, isGameFinished, dispatch }: TimerProps,
): ReactElement<HTMLDivElement> => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [milliseconds, setMilliseconds] = useState<number>(0);

  const timerRef = useRef<number | null>(null);

  const tick = (): void => {
    timerRef.current = setInterval((): void => {
      setMilliseconds((prevMilliseconds): number => {
        if (prevMilliseconds < 99) {
          return prevMilliseconds + 1;
        }

        if (seconds === 59) {
          setMinutes((prevMinutes): number => prevMinutes + 1);
          setSeconds(0);
          return 0;
        }

        setSeconds((prevSeconds): number => prevSeconds + 1);
        return 0;
      });
    }, 10);
  };

  useEffect((): (() => void) => {
    if (isGameRunning) {
      tick();
    } else {
      clearInterval(timerRef.current);
    }

    return (): void => {
      clearInterval(timerRef.current);
    };
  }, [isGameRunning]);

  useEffect((): void => {
    if (isGameFinished) {
      dispatch({
        action: 'SET_CURRENT_RESULT',
        payload: { currentResult: minutes * 60000 + seconds * 1000 + milliseconds },
      });
    }
  }, [isGameRunning]);

  const time = (
    <span className={cn({ 'blink-text': isGameFinished })}>
      {`${formatTimeValue(minutes)}:${formatTimeValue(seconds)}:${formatTimeValue(milliseconds)}`}
    </span>
  );

  return time;
};

export default Timer;
