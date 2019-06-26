import React, { FC, ReactElement } from 'react';
import Button from '@material-ui/core/Button';

interface StartButtonProps {
  isGameRunning: boolean;
  isGameFinished: boolean;
  startGame(): void;
  pauseGame(): void;
}

const StartButton: FC<StartButtonProps> = (
  {
    startGame,
    pauseGame,
    isGameRunning,
    isGameFinished,
  }: StartButtonProps,
): ReactElement<HTMLButtonElement> => (
  <Button
    onClick={isGameRunning ? pauseGame : startGame}
    variant="contained"
    color="primary"
    disabled={isGameFinished}
  >
    {isGameRunning ? 'Pause' : 'Start'}
  </Button>
);

export default StartButton;
