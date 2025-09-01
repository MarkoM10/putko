import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Pencil } from "lucide-react";
import { IFavoriteRoute } from "../interfaces/interfaces";
import { getFavoritesService } from "../services/getFavoritesService";
import { updateFavoriteAliasService } from "../services/updateFavoriteAliasService";
import { showAlert } from "../redux/alert/alertSlice";

const Favorites = () => {
  const { token } = useSelector((state: RootState) => state.token);
  const [favorites, setFavorites] = useState<IFavoriteRoute[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [editingAliasId, setEditingAliasId] = useState<number | null>(null);
  const [editedAlias, setEditedAlias] = useState("");
  const dispatch = useDispatch();

  //Fetching favorite trips based on token (user_id)
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavoritesService(token);
        setFavorites(response.favorites);
      } catch (error) {
        dispatch(
          showAlert({
            success: false,
            message: "Neuspešno izlistavanje omiljenih ruta.",
          })
        );
      }
    };

    if (token) fetchFavorites();
  }, [token]);

  return (
    <div className="w-[26rem] sm:w-[42rem] md:w-full max-w-7xl">
      <div className="p-4">
        <div className="favoritesHeadersWrapper">
          <h1 className="text-2xl font-bold mb-4 text-primary-900">
            Omiljene rute
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Pretraži omiljenu rutu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm w-full sm:w-1/2"
              maxLength={255}
            />
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="px-4 py-2 bg-primary-900 text-white rounded-lg text-sm hover:bg-primary-800 transition"
            >
              Sortiraj po datumu: {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>
        {favorites.length === 0 ? (
          <div className="text-center text-gray-500 py-10 border rounded-3xl">
            <p>Trenutno nema omiljenih ruta.</p>
          </div>
        ) : (
          <div className="relative shadow-md sm:rounded-3xl overflow-hidden">
            <table className="sm:w-full text-sm text-center text-white table-fixed">
              <thead className="text-xs font-josefin text-white uppercase bg-primary-900 sticky top-0 z-10">
                <tr>
                  <th className="w-[10%] px-6 py-3">ID</th>
                  <th className="w-[25%] px-6 py-3">Polazak</th>
                  <th className="w-[25%] px-6 py-3">Destinacija</th>
                  <th className="w-[20%] px-6 py-3">Alias</th>
                  <th className="w-[20%] px-6 py-3">Datum dodavanja</th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
              <table className="sm:w-full text-sm text-center text-gray-500 table-fixed border-separate">
                <tbody>
                  {favorites
                    .filter((fav) =>
                      fav.destination
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .sort((a, b) => {
                      const aDate = new Date(a.created_at).getTime();
                      const bDate = new Date(b.created_at).getTime();
                      return sortOrder === "asc"
                        ? aDate - bDate
                        : bDate - aDate;
                    })
                    .map((fav) => (
                      <tr
                        key={fav.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="w-[10%] px-6 py-4 font-medium whitespace-nowrap">
                          {fav.id}
                        </td>
                        <td className="w-[25%] px-6 py-4">{fav.origin}</td>
                        <td className="w-[25%] px-6 py-4">{fav.destination}</td>
                        <td className="w-[20%] px-6 py-4">
                          {editingAliasId === fav.id ? (
                            <input
                              type="text"
                              value={editedAlias}
                              onChange={(e) => setEditedAlias(e.target.value)}
                              onBlur={async () => {
                                const result = await updateFavoriteAliasService(
                                  token,
                                  fav.id,
                                  editedAlias
                                );
                                if (result.success) {
                                  setFavorites((prev) =>
                                    prev.map((f) =>
                                      f.id === fav.id
                                        ? { ...f, alias: editedAlias }
                                        : f
                                    )
                                  );
                                }
                                setEditingAliasId(null);
                              }}
                              className="px-2 py-1 border rounded-md text-sm w-full"
                            />
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <span>{fav.alias}</span>
                              <button
                                onClick={() => {
                                  setEditingAliasId(fav.id);
                                  setEditedAlias(fav.alias || "");
                                }}
                                className="text-blue-600 hover:text-blue-800 transition"
                              >
                                <Pencil size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="w-[20%] px-6 py-4">
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
