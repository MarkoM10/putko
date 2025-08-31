import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { IReport } from "../interfaces/interfaces";
import { getReportsService } from "../services/getReportsService";
import dayjs from "dayjs";
import { Eye, FileDown } from "lucide-react";

const Reports = () => {
  const { token } = useSelector((state: RootState) => state.token);
  const [reports, setReports] = useState<IReport[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReportsService(token);
        setReports(response.reports);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) fetchReports();
  }, [token]);

  return (
    <div className="max-w-7xl">
      <div className="p-4">
        <div className="pdfHeadersWrapper">
          <h1 className="text-2xl font-bold mb-4 text-primary-900">
            PDF Izveštaji
          </h1>
          <p className="text-gray-600 mb-6">
            Pregled svih generisanih izveštaja sa putovanja
          </p>
        </div>

        {reports.length === 0 ? (
          <div className="text-center text-gray-500 py-10 border rounded-3xl">
            <p>Trenutno nema dostupnih PDF izveštaja.</p>
          </div>
        ) : (
          <div className="relative shadow-md sm:rounded-3xl overflow-hidden">
            <table className="w-full text-sm text-left text-white table-fixed">
              <thead className="text-xs font-josefin text-white uppercase bg-primary-900 sticky top-0 z-10">
                <tr>
                  <th className="w-8 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        className="w-4 h-4 text-primary-900 bg-gray-100 border-gray-300 rounded-sm"
                      />
                      <label htmlFor="checkbox-all" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th className="w-8 px-6 py-3">ID</th>
                  <th className="w-1/3 px-6 py-3">Naziv fajla</th>
                  <th className="w-1/4 px-6 py-3">Datum kreiranja</th>
                  <th className="w-12 px-6 py-3">Akcije</th>
                </tr>
              </thead>
            </table>

            {/* Scrollable Body */}
            <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed border-separate">
                <tbody>
                  {reports.map((report, index) => (
                    <tr
                      key={report.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="w-8 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-${report.id}`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`checkbox-${report.id}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="w-8 px-6 py-4 font-medium whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="w-1/3 px-6 py-4 break-all">
                        {report.file_url.split("/").pop()}
                      </td>
                      <td className="w-1/4 px-6 py-4">
                        {dayjs(report.date_created).format(
                          "DD. MMM YYYY, HH:mm"
                        )}
                      </td>
                      <td className="w-12 px-6 py-4">
                        <div className="flex justify-start items-center gap-4">
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
