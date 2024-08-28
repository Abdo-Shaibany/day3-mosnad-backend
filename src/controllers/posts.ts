import { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import { MyPrisma } from './prisma';
import { Prisma } from '@prisma/client';
import { handleError } from 'src/services/prisma_errors.service';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Login, User } from 'src/models/auth.model';
const prisma = MyPrisma.getInstance();

