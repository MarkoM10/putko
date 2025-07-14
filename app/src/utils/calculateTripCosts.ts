import { TripFormData } from "../interfaces/interfaces";

const calculateTripCosts = (distance: number, formData: TripFormData) => {
  const { fuelConsumption, fuelPrice, passengersNum, paytolls, roundTrip } =
    formData;

  const totalTripCost = Math.round(
    roundTrip
      ? ((fuelConsumption * fuelPrice * distance) / 100 + paytolls) * 2
      : (fuelConsumption * fuelPrice * distance) / 100 + paytolls
  );

  const tripCostPerPerson =
    passengersNum > 0
      ? Math.round(totalTripCost / passengersNum)
      : totalTripCost;

  const tripReport = {
    totalDistance: Math.round(roundTrip ? distance * 2 : distance),
    ...(roundTrip && { distancePerDirection: Math.round(distance) }),
    fuelConsumption,
    fuelPrice,
    paytolls,
    roundTrip: roundTrip === 1 ? "Da" : "Ne",
    passengersNum,
    totalTripCost,
    tripCostPerPerson,
  };

  // console.log(tripReport);
  return tripReport;
};

export default calculateTripCosts;
