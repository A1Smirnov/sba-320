import { configureStore } from '@reduxjs/toolkit';
import monsterReducer from './features/monsterSlice';

export const store = configureStore({
  reducer: {
    monster: monsterReducer,
  },
});
