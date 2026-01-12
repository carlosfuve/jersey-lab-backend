import Competition from "../../../../database/models/Competition";
import ICompetition from "../../domain/ICompetition";
import ICompetitionRepository from "../../domain/ICompetitionRepository";


export default class CompetitionRepository implements ICompetitionRepository {

    async exists(comp_id: string): Promise<boolean | null> {
        try {
            const exists: boolean = await Competition.exists(comp_id);
            return exists;
        } catch (_) {
            return null;
        }
    }

    async getAllComp(): Promise<ICompetition[] | null> {
        try {
            const competitions: ICompetition[] = await Competition.getAll();
            return competitions;
        } catch (_) {
            return null;
        }
    }

}