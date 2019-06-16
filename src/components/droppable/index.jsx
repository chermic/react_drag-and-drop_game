import React from 'react'

import DroppableBlock from './DroppableBlock';

import styles from './style';

const DroppableArea = () => {
  return (
    <div className={styles['droppable-area']}>
      <DroppableBlock />
    </div>
  )
}

export default DroppableArea;