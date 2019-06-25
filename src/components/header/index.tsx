import React, { FC, ReactElement } from 'react';
import { useStateValue } from 'state';

import StartButton from './start-button';
import Timer from './timer';

interface HeaderProps {
  [key: string]: any;
}

const Header: FC<HeaderProps> = (props: HeaderProps): ReactElement<HTMLDivElement> => {
  const [{ isGameRunning }, dispatch] = useStateValue();

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
      />
      <Timer isGameRunning={isGameRunning} />
    </div>
  );
};

export default Header;
