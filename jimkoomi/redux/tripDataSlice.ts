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
    clearTripData: (state) => {
      state.fullAddress = '';
      state.latitude = 0;
      state.longitude = 0;
      state.startDate = '';
      state.duration = 1;
      state.vehicles = [];
      state.activities = [];
    },
  },
});

export const {
  setLocationReducer,
  setDateReducer,
  setVehiclesReducer,
  setActivitiesReducer,
  clearTripData,
} = tripDataSlice.actions;

export default tripDataSlice.reducer;
