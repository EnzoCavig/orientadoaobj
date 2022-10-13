import { Request, Response } from "express";
import { client } from "../infra/prisma/cliente";

export default class AlbumController {
    static async List(request: Request, response: Response) {
        const album = await client.album.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        return response.json(album);
    };
    static async Create(request: Request, response: Response) {
    };
    static async Update(request: Request, response: Response) {
    };
    static async Delete(request: Request, response: Response) {
    };
};