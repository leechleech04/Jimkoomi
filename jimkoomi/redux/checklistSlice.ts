import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { ChecklistItemType } from '../types';

const initialState: { name: string; list: ChecklistItemType[] } = {
  name: '',
  list: [],
};

export const checklistSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    setChecklistName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addChecklistItem: (state, action: PayloadAction<ChecklistItemType>) => {
      state.list.push(action.payload);
    },
    removeChecklistItem: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    toggleCheckItem: (state, action: PayloadAction<number>) => {
      const item = state.list.find((item) => item.id === action.payload);
      if (item) {
        item.isChecked = !item.isChecked;
      }
    },
    toggleReminderItem: (state, action: PayloadAction<number>) => {
      const item = state.list.find((item) => item.id === action.payload);
      if (item) {
        item.hasReminder = !item.hasReminder;
      }
    },
    setItemName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const item = state.list.find((item) => item.id === action.payload.id);
      if (item) {
        item.name = action.payload.name;
      }
    },
    inCreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.list.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    deCreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.list.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity = Math.max(item.quantity - 1, 1);
      }
    },
    clearChecklist: (state) => {
      state.list = [];
      state.name = '';
    },
  },
});

export const {
  setChecklistName,
  addChecklistItem,
  removeChecklistItem,
  toggleCheckItem,
  toggleReminderItem,
  setItemName,
  inCreaseQuantity,
  deCreaseQuantity,
  clearChecklist,
} = checklistSlice.actions;

export default checklistSlice.reducer;
