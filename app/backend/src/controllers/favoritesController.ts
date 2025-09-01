import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export interface IFavoritesRequest extends Request {
  user?: { id: number };
}

export const createFavorite = async (req: IFavoritesRequest, res: Response) => {
  if (!req.user)
    return res.status(401).json({ message: "Korisnik nije autorizovan." });

  try {
    const { trip_id, alias } = req.body;
    const user_id = req.user?.id;

    if (!trip_id || !alias || !user_id) {
      return res.status(400).json({ message: "Nedostaju obavezna polja." });
    }

    const trip = await prisma.trips.findUnique({
      where: { id: trip_id },
      select: { origin: true, destination: true },
    });

    if (!trip) {
      return res.status(404).json({ message: "Putovanje nije pronađeno." });
    }

    const favorite = await prisma.favorite_routes.create({
      data: {
        user_id,
        trip_id,
        origin: trip.origin ?? "",
        destination: trip.destination ?? "",
        alias,
      },
    });

    return res
      .status(201)
      .json({ message: "Putovanje uspešno dodato u omiljene.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Greška pri dodavanju putovanja u omiljene.",
      success: false,
    });
  }
};

export const getFavorites = async (req: IFavoritesRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Korisnik nije autorizovan." });
  }

  try {
    const favorites = await prisma.favorite_routes.findMany({
      where: { user_id: req.user.id },
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        user_id: true,
        trip_id: true,
        origin: true,
        destination: true,
        alias: true,
        created_at: true,
      },
    });

    res.status(200).json({ success: true, favorites });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Došlo je do greške prilikom učitavanja omiljenih putovanja.",
    });
  }
};

export const deleteFavorite = async (req: IFavoritesRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Korisnik nije autorizovan." });
  }

  const { trip_id } = req.body;

  if (!trip_id) {
    return res.status(400).json({ message: "Nedostaje trip_id." });
  }

  try {
    await prisma.favorite_routes.deleteMany({
      where: {
        user_id: req.user.id,
        trip_id: trip_id,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Putovanje uklonjeno iz omiljenih." });
  } catch (error) {
    console.error("Greška pri brisanju omiljenog putovanja:", error);
    res.status(500).json({
      success: false,
      message: "Došlo je do greške prilikom uklanjanja omiljenog putovanja.",
    });
  }
};

export const updateFavoriteAlias = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { alias } = req.body;

  if (!alias || alias.trim() === "") {
    return res.status(400).json({ message: "Alias ne može biti prazan." });
  }

  try {
    const updated = await prisma.favorite_routes.update({
      where: { id: Number(id) },
      data: { alias },
    });

    res.status(200).json({ success: true, favorite: updated });
  } catch (error) {
    console.error("Greška pri ažuriranju aliasa:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
};
