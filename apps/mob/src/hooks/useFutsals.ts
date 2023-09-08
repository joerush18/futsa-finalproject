import {
  IFutsal,
  useCurrentLocation,
  useFutsalsStore,
  useGetAllFutsal,
} from "core";
import { calculateDistance } from "../utils/location";

interface FutsalsCategory {
  popular: IFutsal[];
  nearby: IFutsal[];
  all: IFutsal[];
}

const useFutsal = () => {
  const { isLoading, refetch } = useGetAllFutsal();
  const { geoLocation } = useCurrentLocation();
  const { futsals: data } = useFutsalsStore();
  const futsals = data?.length
    ? data.reduce<FutsalsCategory>(
        (acc, futsal) => {
          const distance = calculateDistance(
            geoLocation?.lat,
            geoLocation?.lng,
            futsal.geoLocation?.lat ? +futsal?.geoLocation.lat : 0,
            futsal.geoLocation?.lng ? +futsal?.geoLocation.lng : 0
          );
          if (futsal.ratings >= 0) {
            acc.all.push(futsal);
            acc.popular.push(futsal);
            if (distance < 60) {
              acc.nearby.push(futsal);
              acc.all.push(futsal);
            }
          } else {
            acc.all.push(futsal);
          }
          return acc;
        },
        { popular: [], nearby: [], all: [] }
      )
    : {
        popular: {} as IFutsal[],
        nearby: [] as IFutsal[],
        all: [] as IFutsal[],
      };

  return {
    futsals,
    isLoading,
    refetch,
  };
};

export default useFutsal;
