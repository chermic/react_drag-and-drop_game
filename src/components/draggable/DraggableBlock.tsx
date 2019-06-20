import React from 'react';
import { useDrag } from 'react-dnd';
import cn from 'classnames';

import { useStateValue } from 'state';

import styles from './style.css';

interface CollectProps {
  isDragging: boolean;
}

interface OwnProps {
  id: number;
  title: string;
}

const type = 'block';

const DraggableBlock: React.FC<OwnProps & CollectProps> = ({
  id,
  title,
}: OwnProps): React.ReactElement<HTMLDivElement> => {
  const [{ isGameRunning }] = useStateValue();
  const [{ isDragging }, drag] = useDrag({
    item: { id, title, type },
    begin: (monitor): void => {
    },
    end: (dropResult, monitor): void => {
    },
    canDrag: (): boolean => isGameRunning,
    collect: (monitor): CollectProps => ({
      isDragging: monitor.isDragging(),
    }),
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
  );
};

export default DraggableBlock;
