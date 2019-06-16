import React from 'react'

import { useStateValue } from '../../state';

import styles from './style';

const StartButton = () => {
  const [{ isGameRunning }, dispatch] = useStateValue();

  if (isGameRunning) {
    return <React.Fragment />;
  }

  return (
    <button
      onClick={() => dispatch({ type: 'START_GAME' })}
      className={styles['start-button']}
    >
      Start game
    </button>
  );
};

export default StartButton;