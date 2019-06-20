import * as React from 'react';

import { useStateValue } from 'state';

import styles from './style.css';

const StartButton: React.FC = (): React.ReactElement<HTMLButtonElement> => {
  const [{ isGameRunning }, dispatch] = useStateValue();

  if (isGameRunning) {
    return <React.Fragment />;
  }

  return (
    <button
      type="button"
      onClick={(): void => dispatch({ type: 'START_GAME' })}
      className={styles['start-button']}
    >
      Start game
    </button>
  );
};

export default StartButton;
