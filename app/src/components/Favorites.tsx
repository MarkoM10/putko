import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { IFavoriteRoute } from "../interfaces/interfaces";
import { getFavoritesService } from "../services/getFavoritesService";

const Favorites = () => {
  const { token } = useSelector((state: RootState) => state.token);
  const [favorites, setFavorites] = useState<IFavoriteRoute[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavoritesService(token);
        setFavorites(response.favorites);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) fetchFavorites();
  }, [token]);

  return (
    <div className="max-w-7xl">
      <div className="p-4">
        <div className="favoritesHeadersWrapper">
          <h1 className="text-2xl font-bold mb-4 text-primary-900">
            Omiljene rute
          </h1>
          <p className="text-gray-600 mb-6">
            Pregled svih sačuvanih omiljenih putovanja
          </p>
        </div>
        {favorites.length === 0 ? (
          <div className="text-center text-gray-500 py-10 border rounded-3xl">
            <p>Trenutno nema omiljenih ruta.</p>
          </div>
        ) : (
          <div className="relative shadow-md sm:rounded-3xl overflow-hidden">
            <table className="w-full text-sm text-left text-white table-fixed">
              <thead className="text-xs font-josefin text-white uppercase bg-primary-900 sticky top-0 z-10">
                <tr>
                  <th className="w-8 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-favorites"
                        type="checkbox"
                        className="w-4 h-4 text-primary-900 bg-gray-100 border-gray-300 rounded-sm"
                      />
                      <label
                        htmlFor="checkbox-all-favorites"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th className="w-8 px-6 py-3">ID</th>
                  <th className="w-[180px] px-6 py-3">Polazak</th>
                  <th className="w-[180px] px-6 py-3">Destinacija</th>
                  <th className="w-[160px] px-6 py-3">Alias</th>
                  <th className="w-[160px] px-6 py-3">Datum dodavanja</th>
                </tr>
              </thead>
            </table>

            <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 table-fixed border-separate">
                <tbody>
                  {favorites.map((fav, index) => (
                    <tr
                      key={fav.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="w-8 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-fav-${fav.id}`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`checkbox-fav-${fav.id}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="w-8 px-6 py-4 font-medium whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="w-[180px] px-6 py-4">{fav.origin}</td>
                      <td className="w-[180px] px-6 py-4">{fav.destination}</td>
                      <td className="w-[160px] px-6 py-4">{fav.alias}</td>
                      <td className="w-[160px] px-6 py-4">
                        {dayjs(fav.created_at).format("DD. MMM YYYY, HH:mm")}
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

export default Favorites;
