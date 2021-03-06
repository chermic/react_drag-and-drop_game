import * as React from 'react';

import DroppableBlock from './DroppableBlock';

import styles from './style.css';

const DroppableArea = (): React.ReactElement<HTMLDivElement> => (
  <div className={styles['droppable-area']}>
    <DroppableBlock />
  </div>
);

export default DroppableArea;
