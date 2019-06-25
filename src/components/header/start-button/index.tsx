import React, { FC, ReactElement } from 'react';
import Button from '@material-ui/core/Button';

import styles from './style.css';

interface StartButtonProps {
  isGameRunning: boolean;
  startGame(): void;
  pauseGame(): void;
}

const StartButton: FC<StartButtonProps> = (
  { startGame, pauseGame, isGameRunning }: StartButtonProps,
): ReactElement<HTMLButtonElement> => (
  <Button
    onClick={isGameRunning ? pauseGame : startGame}
    variant="contained"
    color="primary"
  >
    {isGameRunning ? 'Pause' : 'Start'}
  </Button>
);

export default StartButton;
