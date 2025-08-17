// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { AuthRequest } from "../interfaces/interfaces";

// export const authenticate = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ): any => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({ message: "Token nije prosleđen" });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Token nije prosleđen" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
//       userId: number;
//       email: string;
//     };

//     req.user = { userId: decoded.userId, email: decoded.email };

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Nevažeći token" });
//   }
// };
