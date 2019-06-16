import React from 'react'
import { useDrag } from 'react-dnd';
import cn from 'classnames';

import { useStateValue } from '../../state';

import styles from './style';

const type = 'block';

const DraggableBlock = ({ id, title }) => {
  const [{ isGameRunning }] = useStateValue();
  const [ { isDragging }, drag ] = useDrag({
    item: { id, title, type  },
    begin: (monitor) => {
    },
    end: (dropResult, monitor) => {
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  });

  return (
    <div
      className={cn(
        styles['draggable-block'],
        { [styles['draggable-block_dragging']]: isDragging },
        )}
      ref={drag}
    >
      <div className={styles['draggable-block__id']}>{isGameRunning ? id : '?'}</div>
    </div>
  )
}

export default DraggableBlock;