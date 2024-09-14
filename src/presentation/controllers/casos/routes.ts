import { Router } from "express";
import { MonoController } from "./controller";

export class CaseRoutes{
    static get routes(): Router{
        const router = Router();
        const controller = new MonoController();
        router.get("/", controller.getCasos);
        router.get("/:id", controller.getCasoById);
        router.post("/", controller.createCaso);
        router.put("/:id", controller.updateCaso);
        router.delete("/:id", controller.deleteCaso);
        return router;
    }
}