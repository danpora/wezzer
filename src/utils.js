const R = 6371e3; // earth radius in metres

export function distance(lat1, lon1, lat2, lon2) {
  const φ1 = lat1.toRadians();
  const φ2 = lat2.toRadians();
  const Δφ = (lat2-lat1).toRadians();
  const Δλ = (lon2-lon1).toRadians();
  
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  return R * c;
}