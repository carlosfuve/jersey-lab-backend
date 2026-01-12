import { Request, Response } from "express";
import Controller from "../../../shared/infrastructure/controllers/Controller";
import ICompetition from "../../domain/ICompetition";
import ICompetitionUseCaseGetAll from "../../domain/ICompetitionUseCaseGetAll";



export default class CompetitionGetAllController extends Controller {
    constructor(
        private readonly competitionUseCaseGetAll: ICompetitionUseCaseGetAll
    ) {
        super()
    }

    protected async runImplementation(_req: Request, res: Response): Promise<Response> {
        const competitions: ICompetition[] | null = await this.competitionUseCaseGetAll.getAllCompetition();

        return this.sendJsonResponse(res, 200, { competitions });
    }
}