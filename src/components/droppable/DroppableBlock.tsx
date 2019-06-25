import React, {
  FC,
  ReactElement,
  useState,
  useRef,
} from 'react';
import { useDrop } from 'react-dnd';

import { useStateValue } from 'state';

import styles from './style.css';
import { Block } from 'App';

interface CollectProps {
  isOver: boolean;
  canDrop: boolean;
  item: {
    id: number;
    title: string;
  };
}

const type = 'block';
const defaultText = 'Drop block to start';

const DroppableBlock: FC<CollectProps> = (): ReactElement<HTMLDivElement> => {
  const [droppableText, setDroppableText] = useState(defaultText);
  const [{ draggableBoxes }, dispatch] = useStateValue();
  const timerId = useRef(0);

  const backToNormalText = (): void => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout((): void => {
      setDroppableText(defaultText);
    }, 3000);
  };

  const onSuccess = (id: number): void => dispatch({ type: 'SUCCESS_DROP', payload: { id } });
  const nextBlockId: number = Math.min(...draggableBoxes.map(({ id }: Block): number => id));

  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: type,
    hover: (dragObject, monitor): void => {
    },
    drop: (dragObject, monitor): void => {
      setDroppableText(`You was drop ${dragObject.title}`);
      backToNormalText();
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
      : 'Wrong block, don\'t do it!';
  }

  return (
    <div
      className={styles['droppable-block']}
      ref={drop}
      style={{ background }}
    >
      {resultText}
    </div>
  );
};

export default DroppableBlock;
