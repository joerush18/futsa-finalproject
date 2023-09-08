import { create } from "zustand";

type geo = {
  lat: number;
  lng: number;
};

interface CurrentLocationStore {
  geoLocation: geo;
  setGeoLocation: (values: geo) => void;
}

const useCurrentLocation = create<CurrentLocationStore>((set) => ({
  geoLocation: {
    lat: 0,
    lng: 0,
  },
  setGeoLocation: (value: geo) => {
    set((state) => ({ ...state.geoLocation, geoLocation: value }));
  },
}));

export default useCurrentLocation;
export { useCurrentLocation };
