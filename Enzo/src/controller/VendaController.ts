import { Request, Response } from "express";
import { client } from "../infra/prisma/cliente";

export default class VendaController {
    static async List(request: Request, response: Response) {
        const venda = await client.vendas.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        return response.json(venda);
    };
    static async Create(request: Request, response: Response) {
    };
    static async Update(request: Request, response: Response) {
    };
    static async Delete(request: Request, response: Response) {
    };
};