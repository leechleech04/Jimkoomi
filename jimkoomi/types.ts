export type RootStackParamList = {
  Start: undefined;
  WriteDestination: undefined;
  WriteDate: undefined;
  SelectVehicle: undefined;
  SelectActivity: undefined;
};

export interface VehicleItem {
  image: any;
  name: string;
}

export interface LocationData {
  full_address: string;
  latitude: number;
  longitude: number;
}
