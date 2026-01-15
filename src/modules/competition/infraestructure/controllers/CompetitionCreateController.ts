import { Request, Response } from "express";
import ICompetitionUseCaseCreate from "../../domain/ICompetitionUseCaseCreate";
import { ValidationError } from "../../../shared/infrastructure/Errors";
import ICompetition from "../../domain/ICompetition";
import Controller from "../../../shared/infrastructure/controllers/Controller";


export default class CompetitionCreateController extends Controller {
    constructor(
        private readonly competitionUseCaseCreate: ICompetitionUseCaseCreate
    ) {
        super();
    }

    protected async runImplementation(req: Request, res: Response): Promise<Response> {
        try {
            const jsonReqBody = JSON.parse(req.body.data);
            const logoUrl: string = (req.file?.path || (req.file as any).location) ?? "";

            const { name } = jsonReqBody;
            if (!name) throw new ValidationError("The competition name is required");

            const competition: ICompetition = { name, logoUrl }
            const newCompetition: ICompetition = await this.competitionUseCaseCreate.createNewCompetition(competition);

            return this.sendJsonResponse(res, 201, { competition: newCompetition });

        } catch (error) {
            const pathFile: string = (req.file?.path || (req.file as any).location) ?? ""
            // await this.fileManagement.removeFile(pathFile);
            throw error;
        }
    }
}
