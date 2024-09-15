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
            // Calcular la fecha de hace 7 días
            const unaSemanaAtras = new Date();
            unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 7); // Ajustar la fecha para 7 días atrás
    
            // Buscar casos con creationDate mayor o igual a la fecha de hace 7 días
            const casos = await monoModel.find({ creationDate: { $gte: unaSemanaAtras } });
    
            return res.json(casos);
        } catch (error) {
            return res.json({ message: "Ocurrió un error al obtener los casos de la última semana" });
        }
    }
    
}