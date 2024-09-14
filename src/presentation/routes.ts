import { Router } from "express";
import { CaseRoutes } from "./controllers/casos/routes";

export class AppRoutes{
    static get routes():Router{
        const router = Router();
        router.use("/api/casos", CaseRoutes.routes);
        return router;
    }
}
