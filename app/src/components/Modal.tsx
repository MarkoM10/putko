import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { closeModal } from "../redux/reportModal/reportModalSlice";
import euroConversion from "../utils/euroConversion";
import handleGeneratePDF from "../utils/generatePDF";

const Modal = () => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector((state: RootState) => state.toggleModal);
  const { tripData } = useSelector((state: RootState) => state);

  const {
    totalDistance,
    distancePerDirection,
    fuelConsumption,
    fuelPrice,
    paytolls,
    roundTrip,
    passengersNum,
    totalTripCost,
    tripCostPerPerson,
    origin,
    destination,
  } = tripData;

  return (
    <>
      {toggleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-primary-400">
                Pregled putnih troškova
              </h2>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <p className="font-medium">Relacija:</p>
                <p>
                  {origin} → {destination}
                </p>
                <p>
                  <span className="font-medium">Povratno putovanje:</span>{" "}
                  {roundTrip === "Da" ? "Da" : "Ne"}
                </p>
              </div>

              <div className="border-t pt-3">
                <p>
                  <span className="font-medium">Ukupna distanca:</span>{" "}
                  {totalDistance} km
                </p>
                {roundTrip === "Da" && (
                  <p>
                    <span className="font-medium">
                      Udaljenost u jednom pravcu:
                    </span>{" "}
                    {distancePerDirection} km
                  </p>
                )}
              </div>

              <div className="border-t pt-3">
                <p>
                  <span className="font-medium">Potrošnja goriva:</span>{" "}
                  {fuelConsumption}L / 100km
                </p>
                <p>
                  <span className="font-medium">Cena goriva:</span> {fuelPrice}{" "}
                  RSD
                </p>
                <p>
                  <span className="font-medium">Putarine:</span> {paytolls} RSD
                </p>
              </div>

              <div className="border-t pt-3">
                <p>
                  <span className="font-medium">Broj putnika:</span>{" "}
                  {passengersNum}
                </p>
                <p>
                  <span className="font-medium">Ukupna cena putovanja:</span>{" "}
                  {totalTripCost} RSD (€{euroConversion(totalTripCost)})
                </p>
                <p>
                  <span className="font-medium">Cena po osobi:</span>{" "}
                  {tripCostPerPerson} RSD (€{euroConversion(tripCostPerPerson)})
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => handleGeneratePDF(tripData)}
                className="bg-primary-400 hover:bg-primary-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Generiši PDF
              </button>
              <button
                onClick={() => dispatch(closeModal())}
                className="text-secondary hover:text-primary-400 text-sm font-medium"
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
