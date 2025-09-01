import { useDispatch, useSelector } from "react-redux";
import { ITripCalcData } from "../redux/tripCalculationData/tripCalculationDataSlice";
import { setModal } from "../redux/modal/modalSlice";
import { showCalcReport } from "../redux/calcReport/calcReportSlice";

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

  const dispatch = useDispatch();

  return (
    <div className="calcResultWrapper w-full max-w-2xl mx-auto bg-white shadow-lg p-6 space-y-6">
      <div>
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
            <p className="text-lg font-semibold">
              {is_round_trip ? "Da" : "Ne"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Potrošnja</p>
            <p className="text-lg font-semibold">
              {fuel_consumption} L / 100km
            </p>
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
            <p className="text-lg font-semibold">{passengers}</p>
          </div>
        </div>

        <div className="bg-primary-900 shadow-sm text-white rounded-xl p-6 space-y-2">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Ukupni troškovi</p>
            <p className="text-lg font-bold">
              {total_cost} RSD / €{Math.round(Number(total_cost) / 117)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-medium">Cena po osobi</p>
            <p className="text-lg font-bold">
              {cost_per_person ? cost_per_person : total_cost} RSD / €
              {Math.round(
                Number(cost_per_person ? cost_per_person : total_cost) / 117
              )}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() =>
              dispatch(
                setModal({
                  type: "GENERATE_PDF_MODAL",
                  message: "Da li ste sigurni da želite da igenerišete PDF?",
                  isOpen: true,
                })
              )
            }
            className="text-white bg-primary-900 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 w-full"
          >
            Generiši PDF
          </button>
          <button
            className="text-primary-900 bg-neutral-400 hover:bg-neutral-100 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 w-full"
            onClick={() => {
              localStorage.removeItem("lastReport");
              dispatch(showCalcReport(null));
            }}
          >
            Nova kalkulacija
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalcResult;
