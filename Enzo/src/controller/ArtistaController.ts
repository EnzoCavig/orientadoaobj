import { Request, Response } from "express";
import { client } from "../infra/prisma/cliente";

export default class ArtistaController {
    static async List(request: Request, response: Response) {
        try {
            let { id, skip, take } = request.query;
            skip = skip && String(skip).trim() != '' ? String(skip).trim() : '0';
            take = take && String(take).trim() != '' ? String(take).trim() : '20';

            let resposta = {}
            
            if (id) {
                let artista = await client.artista.findMany({

                    where: {
                        id: Number(id)
                    },
                    orderBy: {
                        id: 'asc'
                    }
                });
                if (artista[0]) {
                    resposta = artista[0];
                } else {
                    resposta = {
                        mensagem: "Não encontrado"
                    }
                    return response.status(406).json(resposta);   
                };

            } else {
                const artistas = await client.artista.findMany({
                    skip: Number(skip),
                    take: Number(take),
                });
                if (artistas) {
                    resposta = {
                        totalizadores: {
                            totalLinhas: artistas.length,
                            skip,
                            take,
                        },
                        dados: artistas
                    };

                } else {
                    resposta = {
                        mensagem: "Not Found"
                    }
                    return response.status(406).json(resposta);   
                };
            }
            

            return response.json(resposta);   

            } catch (error) {
                return response.status(500).json(
                    {
                        mensagem: error
                    }
                );
            }
    };

    static async Create(request: Request, response: Response) {
        const data = request.body;
        try {
            const artista = await client.artista.create({
                data: {
                    nome: data.nome
                }
            });
            if (artista) {
                return response.json(
                    artista
                );
            }  
        } catch (error) {
            return response.status(500).json(
                {
                    mensagem: error
                }
            );
        };
    };

    static async Update(request: Request, response: Response) {
        try {
            const data = request.body;
            const updateArtista = await client.artista.update({
                where: {
                    id: Number(data.id)
                },
                data: {
                    nome: data.nome
                }
            });
            if (updateArtista) {
                let resposta = {
                    totalizadores: {
                        totalLinhas: 1,
                    },
                    dados: updateArtista
                };

                return response.json(resposta);
            };
        } catch (error) {
            return response.status(500).json(
                {
                    mensagem: error
                }
            );
        };
    };

    static async Delete(request: Request, response: Response) {
        const { id } = request.query;
        try {
            if (id) {
                const deleteArtista = await client.artista.delete({
                    where: {
                        id: Number(id)
                    }
                })
                if (deleteArtista) {
                    return response.status(202).json(
                        {
                            mensagem: "Sucesso"
                        }
                    );
                };
            }else{
                return response.status(406).json(
                    {
                        mensagem: "Não encontrado"
                    }
                );
            };
        } catch (error) {
            return response.status(500).json(
                {
                    mensagem: error
                }
            );
        };
    };
};