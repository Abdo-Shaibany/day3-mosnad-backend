import { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import { MyPrisma } from './prisma';
import { Prisma } from '@prisma/client';
import { handleError } from 'src/services/prisma_errors.service';
import {
    FetchAllResponse,
    PagedRequest,
    Pagination,
} from 'src/models/pagination.model';
import { PostModel } from 'src/models/posts.model';

const prisma = MyPrisma.getInstance();

export const createPost = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user.id;
    const { content, imageId, title, category } = matchedData(req) as PostModel;
    try {
        const data = await prisma.post.create({
            data: {
                content,
                imageId,
                title,
                category,
                userId
            },
            include: {
                user: true
            }
        });
        res.status(200).json(data as PostModel);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return next(handleError(err));
        }
        const e: any = Error('Server error should log here :)');
        next(e);
    }
};

export const updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id, content, imageId, title, category } = matchedData(req) as PostModel;
    try {
        const data = await prisma.post.update({
            where: {
                id,
            },
            data: {
                content,
                imageId,
                title,
                category
            },
            include: {
                user: true
            }
        });
        res.status(200).json(data as PostModel);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return next(handleError(err));
        }
        const e: any = Error('Server error should log here :)');
        next(e);
    }
};

export const getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const data = await prisma.post.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(data);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return next(handleError(err));
        }
        const e: any = Error('Server error should log here :)');
        next(e);
    }
};

export const getPostsPaged = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user.id;

    const { search, pagination } = matchedData(
        req
    ) as PagedRequest;

    try {
        const items: PostModel[] = await prisma.post.findMany({
            where: {
                userId
            },
            skip: pagination.pageSize * pagination.currentPage,
            take: pagination.pageSize,
            include: {
                user: true,
            }
        });

        const total = await prisma.post.count({
            where: {
                userId
            },
        });

        res.status(200).json({
            items,
            pagination: {
                totalItems: total,
                currentPage: pagination.currentPage,
                pageSize: pagination.pageSize,
            },
        } as Pagination<PostModel>);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return next(handleError(err));
        }
        const e: any = Error('Server error should log here :)');
        next(e);
    }
};

export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await prisma.post.delete({
            where: {
                id: parseInt(req.params['id']),
            },
        });
        res.status(200).json();
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return next(handleError(err));
        }
        const e: any = Error('Server error should log here :)');
        next(e);
    }
};
