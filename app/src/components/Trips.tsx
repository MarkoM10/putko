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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "total_cost" | "distance_km" | "passengers"
  >("total_cost");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
        message:
          "Da li si siguran da želiš da obrišeš ovo putovanje? Brisanjem ovog putovanja biće obrisane i sve omiljene rute i izveštaji vezani za isto.",
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Pretraži destinaciju..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm w-full sm:w-1/2"
            />

            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="px-4 py-2 bg-primary-900 text-white rounded-lg text-sm hover:bg-primary-800 transition"
            >
              Sortiraj po ceni: {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>
        {trips.length === 0 ? (
          <div className="text-center text-gray-500 py-10 border rounded-3xl">
            <p>Trenutno nema dostupnih putovanja.</p>
          </div>
        ) : (
          <div className="relative shadow-md sm:rounded-3xl overflow-hidden">
            <table className="w-full text-sm text-white table-fixed text-center">
              <thead className="text-xs font-josefin text-white uppercase bg-primary-900 sticky top-0 z-10">
                <tr>
                  <th
                    className="w-[5%] px-4 py-3"
                    title="Jedinstveni identifikator putovanja"
                  >
                    ID
                  </th>
                  <th
                    className="w-[15%] px-4 py-3"
                    title="Mesto i vreme polaska"
                  >
                    Polazak
                  </th>
                  <th className="w-[15%] px-4 py-3" title="Mesto dolaska">
                    Destinacija
                  </th>
                  <th
                    className="w-[5%] px-4 py-3"
                    title="Ukupna udaljenost u kilometrima"
                  >
                    km
                  </th>
                  <th
                    className="w-[5%] px-4 py-3"
                    title="Prosečna potrošnja goriva (l/100km)"
                  >
                    L
                  </th>
                  <th className="w-[5%] px-4 py-3" title="Cena goriva po litru">
                    RSD
                  </th>
                  <th className="w-[5%] px-4 py-3" title="Ukupna cena putarina">
                    PT
                  </th>
                  <th className="w-[5%] px-4 py-3" title="Broj putnika">
                    PN
                  </th>
                  <th
                    className="w-[5%] px-4 py-3"
                    title="Da li je putovanje povratno"
                  >
                    RT
                  </th>
                  <th
                    className="w-[12.5%] px-4 py-3"
                    title="Ukupni troškovi putovanja"
                  >
                    Ukupno
                  </th>
                  <th className="w-[12.5%] px-4 py-3" title="Trošak po osobi">
                    Po osobi
                  </th>
                  <th
                    className="w-[10%] px-4 py-3 text-center"
                    title="Brisanje, označavanje kao omiljeno itd."
                  >
                    Akcije
                  </th>
                </tr>
              </thead>
            </table>

            <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
              <table className="w-full text-sm text-center text-gray-500 table-fixed border-separate">
                <tbody>
                  {trips
                    .filter((trip) =>
                      trip.destination
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .sort((a, b) =>
                      sortOrder === "asc"
                        ? Number(a.total_cost) - Number(b.total_cost)
                        : Number(b.total_cost) - Number(a.total_cost)
                    )
                    .map((trip, index) => (
                      <tr
                        key={trip.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="w-[5%] px-4 py-3 font-medium whitespace-nowrap">
                          {trip.id}
                        </td>
                        <td className="w-[15%] px-4 py-3">{trip.origin}</td>
                        <td className="w-[15%] px-4 py-3">
                          {trip.destination}
                        </td>
                        <td className="w-[5%] px-4 py-3">
                          {Math.round(Number(trip.distance_km))}
                        </td>
                        <td className="w-[5%] px-4 py-3">
                          {trip.fuel_consumption}
                        </td>
                        <td className="w-[5%] px-4 py-3">{trip.fuel_price}</td>
                        <td className="w-[5%] px-4 py-3">{trip.tolls}</td>
                        <td className="w-[5%] px-4 py-3">{trip.passengers}</td>
                        <td className="w-[5%] px-4 py-3">
                          {trip.is_round_trip ? "Da" : "Ne"}
                        </td>
                        <td className="w-[12.5%] px-4 py-3 font-semibold">
                          {trip.total_cost}
                        </td>
                        <td className="w-[12.5%] px-4 py-3 font-semibold">
                          {trip.cost_per_person}
                        </td>
                        <td className="w-[10%] px-4 py-3">
                          <div className="flex">
                            <button
                              onClick={() => handleDeleteTrip(trip.id)}
                              className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                            >
                              <Trash2 size={18} />
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
