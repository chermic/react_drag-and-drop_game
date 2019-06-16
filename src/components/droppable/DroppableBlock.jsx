import React from 'react'
import { useDrop } from 'react-dnd';

import { useStateValue } from '../../state'

import styles from './style';

const type = 'block';
const defaultText = 'Drop block to start';

const DroppableBlock = () => {
  const timerId = React.useRef();
  const [ droppableText, setDroppableText ] = React.useState(defaultText);
  const [ { nextNumber }, dispatch ] = useStateValue();
  const [ { isOver, canDrop, item }, drop ] = useDrop({
    accept: type,
    hover: (item, monitor) => {
    },
    drop: (item, monitor) => {
      setDroppableText(`You was drop ${item.title}`);
      backToNormalText();
      onSuccess(item.id);
    },
    canDrop: (item, monitor) => item.id === nextNumber,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    })
  });

  const onSuccess = (id) => dispatch({ type: 'SUCCESS_DROP', payload: { id } });

  const backToNormalText = () => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      setDroppableText(defaultText);
    }, 3000);
  };

  let background = '#212121';
  if (isOver) {
    background = canDrop ? '#42af42' : '#980000';
  }

  let resultText = droppableText;
  if (isOver) {
    resultText = item.id === nextNumber
      ? 'Yeah, release there!'
      : 'Wrong block, don\'t do it!';
  };

  return (
    <div
      className={styles['droppable-block']}
      ref={drop}
      style={{ background }}
    >
      {resultText}
    </div>
  )
}

export default DroppableBlock;