import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { IReport } from "../interfaces/interfaces";
import { getReportsService } from "../services/getReportsService";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { showAlert } from "../redux/alert/alertSlice";

const Reports = () => {
  const { token } = useSelector((state: RootState) => state.token);
  const [reports, setReports] = useState<IReport[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReportsService(token);
        setReports(response.reports);
      } catch (error) {
        dispatch(
          showAlert({
            success: false,
            message: "Neuspešno izlistavanje izveštaja.",
          })
        );
      }
    };

    if (token) fetchReports();
  }, [token]);

  return (
    <div className="w-[26rem] sm:w-[42rem] md:w-full max-w-7xl">
      <div className="p-4">
        <div className="pdfHeadersWrapper">
          <h1 className="text-2xl font-bold mb-4 text-primary-900">
            PDF Izveštaji
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Pretraži naziv fajla..."
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

        {reports.length === 0 ? (
          <div className="text-center text-gray-500 py-10 border rounded-3xl">
            <p>Trenutno nema dostupnih PDF izveštaja.</p>
          </div>
        ) : (
          <div className="relative shadow-md sm:rounded-3xl overflow-hidden">
            <table className="sm:w-full text-sm text-center text-white table-fixed">
              <thead className="text-xs font-josefin text-white uppercase bg-primary-900 sticky top-0 z-10">
                <tr>
                  <th className="w-[10%] px-6 py-3">ID</th>
                  <th className="w-[40%] px-6 py-3">Naziv fajla</th>
                  <th className="w-[40%] px-6 py-3">Datum kreiranja</th>
                  <th className="w-[10%] px-6 py-3">Akcije</th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
              <table className="sm:w-full text-sm text-center text-gray-500 dark:text-gray-400 table-fixed border-separate">
                <tbody>
                  {reports
                    .filter((report) =>
                      report.file_url
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .sort((a, b) => {
                      const aDate = new Date(a.date_created).getTime();
                      const bDate = new Date(b.date_created).getTime();
                      return sortOrder === "asc"
                        ? aDate - bDate
                        : bDate - aDate;
                    })
                    .map((report, index) => (
                      <tr
                        key={report.id}
                        className="bg-white border-b hover:bg-gray-50 w-full"
                      >
                        <td className="w-[10%] px-6 py-4 font-medium whitespace-nowrap">
                          {report.id}
                        </td>
                        <td className="w-[40%] px-6 py-4 break-all">
                          {report.file_url.split("/").pop()}
                        </td>
                        <td className="w-[40%] px-6 py-4">
                          {dayjs(report.date_created).format(
                            "DD. MMM YYYY, HH:mm"
                          )}
                        </td>
                        <td className="w-[10%] px-6 py-4">
                          <div className="flex justify-center items-center gap-4">
                            <a
                              href={`http://localhost:5000${report.file_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              <Eye size={18} />
                            </a>
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

export default Reports;
