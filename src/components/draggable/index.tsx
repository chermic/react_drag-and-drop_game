import React, { useEffect } from 'react';

import { useStateValue } from 'state';

import DraggableBlock from './DraggableBlock';

import styles from './style.css';

const DraggableArea = (): React.ReactElement<HTMLDivElement> => {
  const [{ draggableBoxes }, dispatch] = useStateValue();

  useEffect((): void => {
    if (draggableBoxes.length === 0) {
      dispatch({ type: 'FINISH_GAME' });
    }
  }, [draggableBoxes]);

  return (
    <div className={styles['draggable-area']}>
      {draggableBoxes.map(({ id, title }): React.ReactElement<HTMLDivElement> => (
        <DraggableBlock
          key={id}
          id={id}
          title={title}
        />
      ))}
    </div>
  );
};

export default DraggableArea;
