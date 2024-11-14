import { createSlice } from '@reduxjs/toolkit';

export const monsterSlice = createSlice({
  name: 'monster',
  initialState: {
    name: '',
    type: '',
    stats: {
      hp: 100,
      attack: 50,
      defense: 40,
      speed: 30,
    },
    sprite: ''
  },
  reducers: {
    setMonster: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMonster } = monsterSlice.actions;
export default monsterSlice.reducer;
