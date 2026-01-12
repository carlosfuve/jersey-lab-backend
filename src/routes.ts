import { Router } from "express";
import { Request, Response } from "express";
import competitonRoutes from './modules/competition/infraestructure/routes/competitionRoutes';

const router = Router();

router.use('/competition', competitonRoutes);

router.use('/', (_: Request, res: Response) => { return res.status(404).json({ message: "Not found" }) })

export default router;