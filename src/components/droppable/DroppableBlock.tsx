import React, {
  FC,
  ReactElement,
  useState,
} from 'react';
import { useDrop } from 'react-dnd';
import cn from 'classnames';
import { Block } from 'App';

import { useStateValue } from 'state';

import styles from './style.css';

interface CollectProps {
  isOver: boolean;
  canDrop: boolean;
  item: {
    id: number;
    title: string;
  };
}

const type = 'block';

const DroppableBlock: FC<CollectProps> = (): ReactElement<HTMLDivElement> => {
  const [droppableText, setDroppableText] = useState<string>('Drop block from min to max as fast as possible');
  const [{ draggableBoxes }, dispatch] = useStateValue();

  const onSuccess = (id: number): void => dispatch({ type: 'SUCCESS_DROP', payload: { id } });
  const nextBlockId: number = Math.min(...draggableBoxes.map(({ id }: Block): number => id));

  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: type,
    hover: (dragObject, monitor): void => {
    },
    drop: (dragObject, monitor): void => {
      setDroppableText(`You was drop ${dragObject.title}`);
      setDroppableText(`Yeah! Next block number is ${nextBlockId + 1}!`);
      onSuccess(dragObject.id);
    },
    canDrop: (dragObject, monitor): boolean => dragObject.id === nextBlockId,
    collect: (monitor): CollectProps => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  let background = '#212121';
  if (isOver) {
    background = canDrop ? '#42af42' : '#980000';
  }

  let resultText = droppableText;
  if (isOver) {
    resultText = item.id === nextBlockId
      ? 'Yeah, release there!'
      : "Wrong block, don't do it!";
  }
  if (draggableBoxes.length === 0) {
    resultText = 'Conratulations! You win!';
  }

  return (
    <div
      className={styles['droppable-block']}
      ref={drop}
      style={{ background }}
    >
      <span className={cn({ 'blink-text': draggableBoxes.length === 0 })}>{resultText}</span>
    </div>
  );
};

export default DroppableBlock;
