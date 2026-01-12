import { Router } from "express";
import ICompetitionRepository from "../../domain/ICompetitionRepository";
import CompetitionRepository from "../repsositories/CompetitionRepository";
import ICompetitionUseCaseGetAll from "../../domain/ICompetitionUseCaseGetAll";
import CompetitionGetAllController from "../controllers/CompetitionGetAllController";
import CompetitonUseCaseGetAll from "../../application/CompetitionUseCaseGetAll";



const router = Router();

// Repository and dependencies
const competitionRepository: ICompetitionRepository = new CompetitionRepository();

// Use Cases
const competitionUseCaseGetAll: ICompetitionUseCaseGetAll = new CompetitonUseCaseGetAll(competitionRepository);

// Controllers
const competitonGetAllController = new CompetitionGetAllController(competitionUseCaseGetAll);


router.get("/", competitonGetAllController.run);

export default router;