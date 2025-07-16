import jsPDF from "jspdf";
import { ITripData } from "../redux/tripCalculationData/tripCalculationDataSlice";
import "../fonts/JosefinSans-Regular-normal";
import "../fonts/JosefinSans-Bold-normal";
import euroConversion from "./euroConversion";

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
  doc.setFont("JosefinSans-Bold");
  doc.setLineWidth(0.4);

  doc.setFontSize(18);
  doc.setTextColor(58, 175, 169);
  doc.text("Pregled putnih troškova", 20, y);

  y += 2.5;

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.setFont("JosefinSans-Regular");
  doc.text(`Relacija: ${origin} ${destination}`, 20, (y += 10));
  doc.text(`Povratno putovanje: ${roundTrip}`, 20, (y += 10));

  doc.line(20, y + 4, 190, y + 4);

  y += 5;

  doc.text(`Ukupna distanca: ${totalDistance} km`, 20, (y += 10));
  if (roundTrip === "Da") {
    doc.text(
      `Udaljenost u jednom pravcu: ${distancePerDirection} km`,
      20,
      (y += 10)
    );
  }

  doc.line(20, y + 4, 190, y + 4);

  y += 5;

  doc.text(`Potrošnja goriva: ${fuelConsumption} L / 100km`, 20, (y += 10));
  doc.text(`Cena goriva: ${fuelPrice} RSD`, 20, (y += 10));
  doc.text(`Putarine: ${paytolls} RSD`, 20, (y += 10));

  doc.line(20, y + 4, 190, y + 4);

  y += 5;

  doc.text(`Broj putnika: ${passengersNum}`, 20, (y += 10));
  doc.text(
    `Ukupna cena putovanja: ${totalTripCost} RSD (€${euroConversion(
      totalTripCost
    )})`,
    20,
    (y += 10)
  );
  doc.text(
    `Cena po osobi: ${tripCostPerPerson} RSD (€${euroConversion(
      tripCostPerPerson
    )})`,
    20,
    (y += 10)
  );

  // doc.setFontSize(12);
  // doc.text("Copyright ©Putko 2025", 20, (y += 20));

  doc.save("Putni izveštaj.pdf");
};

export default handleGeneratePDF;
