import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import produce from 'immer';

import { StateProvider } from 'state';


import DraggableArea from './components/draggable';
import DroppableArea from './components/droppable';
import Header from './components/header';

import styles from './style.css';

export interface Block {
  id: number;
  title: string;
}

export interface State {
  draggableBoxes: Block[];
  isGameRunning: boolean;
  isGameFinished: boolean;
}

export interface AnyAction {
  type: string;
  payload?: any;
  error?: any;
}

const blocks: Block[] = [
  { id: 1, title: 'the first block' },
  { id: 2, title: 'the second block' },
  { id: 3, title: 'the third block' },
  { id: 4, title: 'the fourth block' },
  { id: 5, title: 'the fifth block' },
  { id: 6, title: 'the sixth block' },
  { id: 7, title: 'the seventh block' },
  { id: 8, title: 'the eighth block' },
  { id: 9, title: 'the ninth block' },
  { id: 10, title: 'the tenth block' },
];

const getShuffleArray = (array: Block[]): Block[] => {
  if (!Array.isArray(array)) {
    throw new Error('Argument must be Array type');
  }

  const arrayClone = [...array];
  const result = [];
  while (arrayClone.length) {
    const randomIndex = Math.floor(Math.random() * arrayClone.length);
    result.push(...arrayClone.splice(randomIndex, 1));
  }

  return result;
};

const initialState: State = {
  draggableBoxes: getShuffleArray(blocks),
  isGameRunning: false,
  isGameFinished: false,
};

/* eslint-disable no-param-reassign */
const reducer = produce((draft: State, action: AnyAction): void => {
  switch (action.type) {
    case 'SUCCESS_DROP': {
      const { id } = action.payload;
      draft.draggableBoxes = draft.draggableBoxes.filter((box: Block): boolean => box.id !== id);
      break;
    }
    case 'START_GAME':
      draft.isGameRunning = true;
      break;

    case 'PAUSE_GAME':
      draft.isGameRunning = false;
      break;

    case 'FINISH_GAME':
      draft.isGameFinished = true;
      draft.isGameRunning = false;
      break;

    // no default
  }
});
/* eslint-enable no-param-reassign */

const App = (): React.ReactElement<any> => (
  <StateProvider reducer={reducer} initialState={initialState}>
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <Header />
        <DraggableArea />
        <DroppableArea />
      </div>
    </DndProvider>
  </StateProvider>
);

export default App;
