import React from 'react'

import { useStateValue } from 'state';

import DraggableBlock from './DraggableBlock';

import styles from './style';

const DraggableArea = () => {
  const [{ draggableBoxes }] = useStateValue();

  return (
    <div className={styles['draggable-area']}>
      {draggableBoxes.map(({ id, title })=> 
        <DraggableBlock
          key={id}
          id={id}
          title={title}
        />
      )}
    </div>
  );
};

export default DraggableArea;