import { Request, Response } from "express";
import Controller from "../../../shared/infrastructure/controllers/Controller";
import ICompetitionUseCaseUpdate from "../../domain/ICompetitionUseCaseUpdate";
import { ValidationError } from "../../../shared/infrastructure/Errors";
import ICompetition from "../../domain/ICompetition";


export default class CompetitionUpdateController extends Controller {

    constructor(
        private readonly competitionUseCaseUpdate: ICompetitionUseCaseUpdate
    ) {
        super();
    }

    protected async runImplementation(req: Request, res: Response): Promise<Response> {
        try {
            const competitionId: string = req.params.competitionId as string;

            const jsonReqBody = JSON.parse(req.body.data);
            const logoUrl: string = (req.file?.path || (req.file as any).location) ?? "";

            const { name } = jsonReqBody;
            if (!name) throw new ValidationError("The competition name is required");

            const competition: ICompetition = { id: competitionId, name, logoUrl }
            const competitionUpdated: boolean = await this.competitionUseCaseUpdate.updateCompetition(competition);

            if (!competitionUpdated) throw new Error("Could not update the competition");

            //Move tmp to the path, delete tmp


            return this.sendJsonResponse(res, 200, { message: "Competition deleted successfully" });

        } catch (error) {
            // Eliminar carpeta temporal si el name no existe
            /* const { name } = JSON.parse(req.body.data);
             if (!name || typeof name != "string" || !name.trim()) {
                 if (this.isS3Path((req.file as any)?.location ?? "")) {
                     await this.fileManagement.removeDirectory("project/tmp/");
                 }
                 else {
                     const pathDirMainImg: string = path.join(process.cwd(), "uploads", "project", "tmp");
                     await this.fileManagement.removeDirectory(pathDirMainImg);
                 }
 
                 throw error;
             }
 
             const pathFile: string = (req.file?.path || (req.file as any)?.location) ?? "";
             if (!pathFile) throw error;
             if (this.isS3Path(pathFile)) {
                 const key = this.extractS3KeyFromUrl(pathFile);
                 await this.fileManagement.removeFile(key);
             }
             else await this.fileManagement.removeFile(pathFile);
 */
            throw error;
        }
    }
}