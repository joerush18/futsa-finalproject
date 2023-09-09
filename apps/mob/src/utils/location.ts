function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  if (lat1 === 0 || lon1 === 0 || lat2 === 0 || lon2 === 0) return 0;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

export const calculateTravelTime = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  if (lat1 === 0 || lon1 === 0 || lat2 === 0 || lon2 === 0) return 0;
  // Calculate the distance between the two coordinates (in kilometers)
  const distance = calculateDistance(lat1, lon1, lat2, lon2);
  const averageSpeedKmph = 10;

  const travelTimeHours = distance / averageSpeedKmph;

  const travelTimeMinutes = travelTimeHours * 60;

  return travelTimeMinutes;
};
