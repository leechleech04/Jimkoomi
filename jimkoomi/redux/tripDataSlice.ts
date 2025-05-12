import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { LocationData, TripDataState } from '../types';

const initialState: TripDataState = {
  fullAddress: '',
  latitude: 0,
  longitude: 0,
  startDate: '',
  duration: 1,
  vehicles: [],
  activities: [],
};

export const tripDataSlice = createSlice({
  name: 'tripData',
  initialState,
  reducers: {
    setLocationReducer: (state, action: PayloadAction<LocationData>) => {
      state.fullAddress = action.payload.fullAddress;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setDateReducer: (
      state,
      action: PayloadAction<{ startDate: string; duration: number }>
    ) => {
      state.startDate = action.payload.startDate;
      state.duration = action.payload.duration;
    },
    setVehiclesReducer: (state, action: PayloadAction<number[]>) => {
      state.vehicles = action.payload;
    },
    setActivitiesReducer: (state, action: PayloadAction<number[]>) => {
      state.activities = action.payload;
    },
  },
});

export const {
  setLocationReducer,
  setDateReducer,
  setVehiclesReducer,
  setActivitiesReducer,
} = tripDataSlice.actions;

export default tripDataSlice.reducer;
