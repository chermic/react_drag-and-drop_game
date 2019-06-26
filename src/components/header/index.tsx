import React, { FC, ReactElement } from 'react';
import { useStateValue } from 'state';

import StartButton from './start-button';
import Timer from './timer';

interface HeaderProps {
  [key: string]: any;
}

const Header: FC<HeaderProps> = (props: HeaderProps): ReactElement<HTMLDivElement> => {
  const [{ isGameRunning, isGameFinished }, dispatch] = useStateValue();

  const startGame = (): void => {
    dispatch({ type: 'START_GAME' });
  };

  const pauseGame = (): void => {
    dispatch({ type: 'PAUSE_GAME' });
  };

  return (
    <div>
      <StartButton
        startGame={startGame}
        pauseGame={pauseGame}
        isGameRunning={isGameRunning}
        isGameFinished={isGameFinished}
      />
      <Timer isGameRunning={isGameRunning} isGameFinished={isGameFinished} />
    </div>
  );
};

export default Header;
