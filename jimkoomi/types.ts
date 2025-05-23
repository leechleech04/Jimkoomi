export type RootStackParamList = {
  Start: undefined;
  WriteDestination: undefined;
  WriteDate: undefined;
  SelectVehicle: undefined;
  SelectActivity: undefined;
  CreateChecklist: { isNewList: boolean };
  Home: undefined;
  ChecklistDetail: { name: string };
};

export interface VehicleItem {
  id: number;
  image: any;
  name: string;
}

export interface LocationData {
  fullAddress: string;
  latitude: number;
  longitude: number;
}

export interface TripDataState {
  fullAddress: string;
  latitude: number;
  longitude: number;
  startDate: string;
  duration: number;
  vehicles: number[];
  activities: number[];
}

export interface ChecklistItemType {
  id: number;
  name: string;
  quantity: number;
  isChecked: boolean;
  hasReminder: boolean;
}

export interface StoredChecklistType {
  tripData: TripDataState;
  checklist: {
    name: string;
    list: ChecklistItemType[];
  };
}
