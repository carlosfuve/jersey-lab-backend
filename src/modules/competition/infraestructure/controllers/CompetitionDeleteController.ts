import { Request, Response } from "express";
import Controller from "../../../shared/infrastructure/controllers/Controller";
import ICompetitionUseCaseDelete from "../../domain/ICompetitionUseCaseDelete";


export default class CompetitionDeleteController extends Controller {
    constructor(
        private readonly competitionUseCaseDelete: ICompetitionUseCaseDelete
    ) {
        super();
    }

    protected async runImplementation(req: Request, res: Response): Promise<Response> {
        const competitionId: string = req.params.competitionId as string;

        const competitionDeleted: boolean = await this.competitionUseCaseDelete.deleteCompetition(competitionId);
        if (!competitionDeleted) throw new Error("Could not delete the competition");

        //Remove the path 

        return this.sendJsonResponse(res, 200, { message: "Competition deleted successfully" });
    }
}