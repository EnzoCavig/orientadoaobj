import { Request, Response } from "express";
import { client } from "../infra/prisma/cliente";

export default class MusicaController {
    static async List(request: Request, response: Response) {
        try {
            const { id, skip, take } = request.query;
        if (id) {
            const musica = await client.musicas.findMany({
                where: {
                    id: Number(id)
                },
                orderBy: {
                    id: 'asc'
                }
            });
            if (musica[0]) {
                return response.json(musica[0]);
            } else {
                return response.json(
                    {
                        "msg" : "Not Found"
                    }
                );
            };
        } else {
            if (skip && take) {
                const musica = await client.musicas.findMany({
                    skip: Number(skip),
                    take: Number(take),
                });
                if (musica[0]) {
                    return response.json(musica[0]);
                } else {
                    return response.json(
                        {
                            "msg" : "Not Found"
                        }
                    );
                };
            }
        }
        const musica = await client.musicas.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        return response.json(musica);   
        } catch (error) {
            return response.json(
                {
                    "msg" : error
                }
            );
        }
    };

    static async Create(request: Request, response: Response) {
        const data = request.body;
        try {
            const musica = await client.musicas.create({
                data: {
                    nome: data.nome,
                    album_id: Number(data.album_id)
                }
            });
            if (musica) {
                return response.json(
                    {
                        "msg" : "Successes"
                    }
                );
            }  
        } catch (error) {
            return response.json(
                {
                    "msg" : error
                }
            );
        };
    };

    static async Update(request: Request, response: Response) {
        try {
            const data = request.body;
            const updataMusica = await client.musicas.update({
                where: {
                    id: Number(data.id)
                },
                data: {
                    nome: data.nome,
                    album_id: Number(data.album_id)
                }
            });
            if (updataMusica) {
                return response.json(
                    {
                        "msg" : "Successes"
                    }
                );
            };
        } catch (error) {
            return response.json(
                {
                    "msg" : "Fail"
                }
            );
        };
    };

    static async Delete(request: Request, response: Response) {
        const { id } = request.query;
        try {
            if (id) {
                const deleteMusica = await client.musicas.delete({
                    where: {
                        id: Number(id)
                    }
                })
                if (deleteMusica) {
                    return response.json(
                        {
                            "msg" : "Successes"
                        }
                    );
                };
            };
        } catch (error) {
            return response.json(
                {
                    "msg" : "Fail"
                }
            );
        };
    };
};