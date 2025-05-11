export type RootStackParamList = {
  Start: undefined;
  WriteDestination: undefined;
  WriteDate: undefined;
  SelectVehicle: undefined;
  SelectActivity: undefined;
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
