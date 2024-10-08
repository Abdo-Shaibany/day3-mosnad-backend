import { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import { MyPrisma } from './prisma';
import { Prisma } from '@prisma/client';
import { handleError } from 'src/services/prisma_errors.service';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Login, User } from 'src/models/auth.model';
const prisma = MyPrisma.getInstance();

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = matchedData(req) as Login;
    try {
        const user: User | null = await prisma.user.findUnique({
            where: {
                email
            },
        });

        if (!user || !bcrypt.compareSync(password, user.password!)) {
            const error: any = new Error("invalid credentials");
            error.status = 401;
            return next(handleError(error));
        };

        let result: any = { ...user };

        delete result.password;

        res.status(200).json(jwt.sign(result, process.env['JWT_PASSWORD']!))
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return next(handleError(err));
        }
        const e: any = Error('Server error should log here :)');
        next(e);
    }
};
