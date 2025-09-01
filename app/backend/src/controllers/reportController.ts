import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { PrismaClient } from "../generated/prisma";
import euroConversion from "../utils/euroConversion";

const prisma = new PrismaClient();

export interface IReportRequest extends Request {
  user?: { id: number };
}

export const createReport = async (req: IReportRequest, res: Response) => {
  try {
    const { trip_id } = req.body;
    if (!trip_id)
      return res.status(400).json({ message: "trip_id is required" });

    const trip = await prisma.trips.findUnique({
      where: { id: Number(trip_id) },
    });
    if (!trip)
      return res.status(404).json({ message: "Putovanje nije pronađeno." });

    const reportsDir = path.join(__dirname, "../../reports/files");
    if (!fs.existsSync(reportsDir))
      fs.mkdirSync(reportsDir, { recursive: true });

    const fileName = `Putko_izveštaj_${trip.id}.pdf`;
    const filePath = path.join(reportsDir, fileName);
    const fileUrl = `/reports/files/${fileName}`;

    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc
      .fontSize(18)
      .fillColor("#1d5855")
      .text("Pregled putnih troškova", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).fillColor("black");
    doc.text(`Relacija: ${trip.origin} - ${trip.destination}`);
    doc.text(`Povratno putovanje: ${trip.is_round_trip ? "Da" : "Ne"}`);
    doc.moveDown();
    doc.text(`Ukupna distanca: ${Number(trip.distance_km) * 2} km`);
    if (trip.is_round_trip) {
      doc.text(
        `Udaljenost u jednom pravcu: ${Number(trip.distance_km).toFixed(2)} km`
      );
    }
    doc.moveDown();
    doc.text(`Potrošnja goriva: ${trip.fuel_consumption} L / 100km`);
    doc.text(`Cena goriva: ${trip.fuel_price} RSD`);
    doc.text(`Putarine: ${trip.tolls} RSD`);
    doc.moveDown();
    doc.text(`Broj putnika: ${trip.passengers}`);
    doc.text(
      `Ukupna cena putovanja: ${trip.total_cost} RSD (€${euroConversion(
        Number(trip.total_cost)
      )})`
    );
    doc.text(
      `Cena po osobi: ${
        trip.cost_per_person ? trip.cost_per_person : trip.total_cost
      } RSD (€${euroConversion(
        Number(trip.cost_per_person ? trip.cost_per_person : trip.total_cost)
      )})`
    );
    doc.end();

    writeStream.on("finish", async () => {
      await prisma.pdf_reports.create({
        data: {
          trip_id: trip.id,
          file_url: fileUrl,
        },
      });

      res.download(filePath, fileName);
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Serverska greška! Molimo Vas pokušajte kasnije." });
  }
};

// Dobavljanje svih PDF izveštaja logovanog korisnika
export const getReports = async (req: IReportRequest, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Korisnik nije autorizovan." });

    const reports = await prisma.pdf_reports.findMany({
      where: {
        trips: { user_id: req.user.id },
      },
      orderBy: { date_created: "desc" },
    });

    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Došlo je do greške prilikom učitavanja PDF izveštaja.",
    });
  }
};
