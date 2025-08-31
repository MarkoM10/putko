import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//Login controller
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Email adresa nije pronađena.",
      });
    }

    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      return res.status(401).json({
        message: "Lozinka nije pronađena.",
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Uspešno ste se ulogovali!",
      token,
      user: {
        user_id: user.id,
        username: user.username,
        user_email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Došlo je do greške prilikom logovanja.",
    });
  }
};

//Sign up controller
export const signUp = async (req: Request, res: Response): Promise<any> => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Sva polja su obavezna." });
  }

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email adresa je već registrovana.",
      });
    }

    const existingUserByUsername = await prisma.users.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      return res.status(400).json({
        message: "Korisničko ime je zauzeto.",
      });
    }

    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Registracija je uspešna!",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Došlo je do greške prilikom registracije." });
  }
};
