import * as React from 'react';

import { useStateValue } from 'state';

import DraggableBlock from './DraggableBlock';

import styles from './style.css';

const DraggableArea = (): React.ReactElement<HTMLDivElement> => {
  const [{ draggableBoxes }] = useStateValue();

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
