import { useSelector } from "react-redux";
import { ITripCalcData } from "../redux/tripCalculationData/tripCalculationDataSlice";

const CalcResult = () => {
  const {
    origin,
    destination,
    distance_km,
    fuel_consumption,
    fuel_price,
    tolls,
    passengers,
    is_round_trip,
    total_cost,
    cost_per_person,
  } = useSelector(
    (state: { tripCalcData: ITripCalcData }) => state.tripCalcData
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-primary-900 border-b pb-3">
        Izveštaj puta
      </h2>

      <div className="flex justify-between items-center bg-teal-50 rounded-lg p-4">
        <div>
          <p className="text-sm text-gray-500">Polazak</p>
          <p className="font-semibold text-gray-800">{origin}</p>
        </div>
        <div className="text-center text-teal-700 font-bold">→</div>
        <div>
          <p className="text-sm text-gray-500">Destinacija</p>
          <p className="font-semibold text-gray-800">{destination}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Ukupna udaljenost</p>
          <p className="text-lg font-semibold">
            {is_round_trip ? Number(distance_km) * 2 : distance_km} km
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Povratno putovanje</p>
          <p className="text-lg font-semibold">{is_round_trip ? "Da" : "Ne"}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Potrošnja</p>
          <p className="text-lg font-semibold">{fuel_consumption} L / 100km</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Cena goriva</p>
          <p className="text-lg font-semibold">{fuel_price} RSD / L</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Putarine</p>
          <p className="text-lg font-semibold">{tolls || "0"} RSD</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Broj putnika</p>
          <p className="text-lg font-semibold">{passengers || 1}</p>
        </div>
      </div>

      <div className="bg-primary-900 text-white rounded-xl p-6 space-y-2">
        <div className="flex justify-between">
          <p className="text-lg font-medium">Ukupni troškovi</p>
          <p className="text-lg font-bold">
            {total_cost} RSD / €{Math.round(Number(total_cost) / 117)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-medium">Cena po osobi</p>
          <p className="text-lg font-bold">
            {cost_per_person} RSD / €{Math.round(Number(cost_per_person) / 117)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalcResult;
