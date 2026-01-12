import { Router } from "express";
import { Request, Response } from "express";

const router = Router();


router.use('/', (_: Request, res: Response) => { return res.status(404).json({ message: "Not found" }) })

export default router;