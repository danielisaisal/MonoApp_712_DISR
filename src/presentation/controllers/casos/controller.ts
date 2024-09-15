import { Request, Response } from "express"
import { EmailService } from "../../../domain/services/email.service";
import { monoModel } from "../../../data/models/mono.model";

export class MonoController{
    public getCasos = async (req: Request,res: Response)=>{
        try {
            const casos = await monoModel.find();
            return res.json(casos);
        } catch (error) {
            return res.json([]);
        }
    }

    public createCaso = async (req: Request, res: Response)=>{
        try {
            const {lat, lng, isSend, genre, age, creationDate} = req.body;
            const newCaso = await monoModel.create({
                lat,
                lng,
                isSend,
                genre,
                age,
                creationDate
            });
            res.json(newCaso);
        } catch (error) {
            res.json({message:"Error creando registro"});
        }
    }

    public getCasoById = async (req:Request, res: Response)=>{
        try {
            const { id } = req.params;
            const caso = await monoModel.findById(id);
            return res.json(caso);
        } catch (error) {
            return res.json({message:"Ocurrio un error al buscar"})
        }
    }

    public updateCaso = async (req:Request, res: Response) =>{
        try {
            const { id } = req.params;
            const {lat, lng, genre, age, creationDate} = req.body;
            await monoModel.findByIdAndUpdate(id,{
                lat,
                lng,
                genre,
                age,
                creationDate
            });
            const updatedCaso = await monoModel.findById(id);
            return res.json(updatedCaso);
        } catch (error) {
            return res.json({message:"Ocurrio un error al actualizar"})
        }
    }

    public deleteCaso = async (req:Request, res: Response) =>{
        try {
            const { id } = req.params;
            await monoModel.findByIdAndDelete(id);
            return res.json({message:"Caso eliminado"});
        } catch (error) {
            return res.json({message:"Ocurrio un error al eliminar"})
        }
    }

    public getCasosUltimaSemana = async (req: Request, res: Response) => {
        try {
            // Calcular el rango de fechas
            const now = new Date();
            const aWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
            // Buscar casos en el rango de fechas
            const casos = await monoModel.find({
                creationDate: {
                    $gte: aWeekAgo,
                    $lte: now
                }
            });
    
            res.json(casos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los casos' });
        }
    };
    
}