import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getTripsService } from "../services/getTripsService";
import { ITrip } from "../interfaces/interfaces";
import { Heart, Pencil, Trash2 } from "lucide-react";
import { setModal } from "../redux/modal/modalSlice";
import { setTripID } from "../redux/tripId/tripIdSlice";
import { getFavoritesService } from "../services/getFavoritesService";
import { deleteFromFavoritesService } from "../services/deleteFromFavoriteService";

const Trips = () => {
  const { token } = useSelector((state: RootState) => state.token);
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [favoritedTripIds, setFavoritedTripIds] = useState<number[]>([]);
  const [favoritesChanged, setFavoritesChanged] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavoritesService(token);

        const tripIds = favorites.favorites.map(
          (fav: { trip_id: number }) => fav.trip_id
        );
        setFavoritedTripIds(tripIds);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    if (token) fetchFavorites();
  }, [token, favoritesChanged]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getTripsService(token);
        setTrips(response.trips);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) fetchTrips();
  }, [token, trips]);

  const handleAddToFavorites = async (tripId: number) => {
    if (favoritedTripIds.includes(tripId)) {
      dispatch(setTripID(tripId));
      dispatch(
        setModal({
          type: "DELETE_FROM_FAVORITES_MODAL",
          message:
            "Da li si siguran da želiš da ukloniš ovo putovanje iz omiljenih?",
          isOpen: true,
        })
      );
      setFavoritedTripIds((prev) => prev.filter((id) => id !== tripId));
      setFavoritesChanged((prev) => !prev);
    } else {
      dispatch(setTripID(tripId));
      dispatch(
        setModal({
          type: "ADD_TO_FAVORITES_MODAL",
          message: "Da li si siguran da želiš da dodaš putovanje u omiljeno?",
          isOpen: true,
        })
      );
      setFavoritesChanged((prev) => !prev);
    }
  };

  const handleDeleteTrip = async (tripId: number) => {
    dispatch(setTripID(tripId));
    dispatch(
      setModal({
        type: "DELETE_TRIP_MODAL",
        message: "Da li si siguran da želiš da obrišeš ovo putovanje?",
        isOpen: true,
      })
    );
  };

  return (
    <div className="max-w-6xl">
      <div className="p-4">
        <div className="tripsHeadersWrapper">
          <h1 className="text-2xl font-bold mb-4 text-primary-900">
            Putovanja
          </h1>
          <p className="text-gray-600 mb-6">
            Pregled svih unetih putnih kalkulacija
          </p>
        </div>

        {trips.length === 0 ? (
          <div className="text-center text-gray-500 py-10 border rounded-3xl">
            <p>Trenutno nema dostupnih putovanja.</p>
          </div>
        ) : (
          <div className="relative shadow-md sm:rounded-3xl overflow-hidden">
            <table className="w-full text-sm text-left text-white table-fixed">
              <thead className="text-xs font-josefin text-white uppercase bg-primary-900 sticky top-0 z-10">
                <tr>
                  <th className="w-12 p-4 sticky left-0 z-20">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-trips"
                        type="checkbox"
                        className="w-4 h-4 text-primary-900 bg-gray-100 border-gray-300 rounded-sm"
                      />
                      <label htmlFor="checkbox-all-trips" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th className="w-12 px-4 py-3">Broj</th>
                  <th className="w-[180px] px-4 py-3">Polazak</th>
                  <th className="w-[180px] px-4 py-3">Destinacija</th>
                  <th className="w-[120px] px-4 py-3">Udaljenost</th>
                  <th className="w-[120px] px-4 py-3">Potrošnja</th>
                  <th className="w-[90px] px-4 py-3">Cena goriva</th>
                  <th className="w-[90px] px-4 py-3">Putarine</th>
                  <th className="w-[70px] px-4 py-3">Putnici</th>
                  <th className="w-[80px] px-4 py-3">Povratno</th>
                  <th className="w-[110px] px-4 py-3">Ukupno</th>
                  <th className="w-[110px] px-4 py-3">Po osobi</th>
                  <th className="w-[120px] px-4 py-3 text-center">Akcije</th>
                </tr>
              </thead>
            </table>

            <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 table-fixed border-separate">
                <tbody>
                  {trips.map((trip, index) => (
                    <tr
                      key={trip.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="w-12 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-trip-${trip.id}`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`checkbox-trip-${trip.id}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="w-12 px-4 py-3 font-medium whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="w-[180px] px-4 py-3">{trip.origin}</td>
                      <td className="w-[180px] px-4 py-3">
                        {trip.destination}
                      </td>
                      <td className="w-[120px] px-4 py-3">
                        {trip.distance_km}
                      </td>
                      <td className="w-[120px] px-4 py-3">
                        {trip.fuel_consumption}
                      </td>
                      <td className="w-[90px] px-4 py-3">{trip.fuel_price}</td>
                      <td className="w-[90px] px-4 py-3">{trip.tolls}</td>
                      <td className="w-[70px] px-4 py-3">{trip.passengers}</td>
                      <td className="w-[80px] px-4 py-3">
                        {trip.is_round_trip ? "Da" : "Ne"}
                      </td>
                      <td className="w-[110px] px-4 py-3 font-semibold">
                        {trip.total_cost}
                      </td>
                      <td className="w-[110px] px-4 py-3 font-semibold">
                        {trip.cost_per_person}
                      </td>
                      <td className="w-[120px] px-4 py-3">
                        <div className="flex">
                          <button
                            onClick={() => handleDeleteTrip(trip.id)}
                            className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                          >
                            <Trash2 size={18} />
                          </button>

                          <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition">
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleAddToFavorites(trip.id)}
                            className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-500 transition"
                          >
                            {favoritedTripIds.includes(trip.id) ? (
                              <Heart size={18} fill="#111" />
                            ) : (
                              <Heart size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;
