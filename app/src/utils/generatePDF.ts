import jsPDF from "jspdf";
import { ITripData } from "../redux/tripCalculationData/tripCalculationDataSlice";

const handleGeneratePDF = (tripData: ITripData) => {
  const doc = new jsPDF();

  if (!tripData) return;

  const {
    origin,
    destination,
    roundTrip,
    totalDistance,
    distancePerDirection,
    fuelConsumption,
    fuelPrice,
    paytolls,
    passengersNum,
    totalTripCost,
    tripCostPerPerson,
  } = tripData;

  let y = 20;

  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text("Pregled putnih troškova", 20, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Relacija: ${origin} → ${destination}`, 20, (y += 10));
  doc.text(`Povratno putovanje: ${roundTrip}`, 20, (y += 10));

  doc.text(`Ukupna distanca: ${totalDistance} km`, 20, (y += 10));
  if (roundTrip === "Da") {
    doc.text(
      `Udaljenost u jednom pravcu: ${distancePerDirection} km`,
      20,
      (y += 10)
    );
  }

  doc.text(`Potrošnja goriva: ${fuelConsumption} L / 100km`, 20, (y += 10));
  doc.text(`Cena goriva: ${fuelPrice} RSD`, 20, (y += 10));
  doc.text(`Putarine: ${paytolls} RSD`, 20, (y += 10));
  doc.text(`Broj putnika: ${passengersNum}`, 20, (y += 10));
  doc.text(`Ukupna cena putovanja: ${totalTripCost} RSD`, 20, (y += 10));
  doc.text(`Cena po osobi: ${tripCostPerPerson} RSD`, 20, (y += 10));

  doc.save("Putni izveštaj.pdf");
};

export default handleGeneratePDF;
