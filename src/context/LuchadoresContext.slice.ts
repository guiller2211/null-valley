import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LuchadorData } from '../types/luchador';


export const INITIAL_STATE: LuchadorData = {
  name: '',
  image: {
    fullPath: '',
    nameImage: '',
    type: ''
  },

};

export const slice = createSlice({
  name: 'luchador',
  initialState: INITIAL_STATE,
  reducers: {
    updateLuchador: (_, action: PayloadAction<LuchadorData>) => {
      return action.payload;
    },
  },
});
