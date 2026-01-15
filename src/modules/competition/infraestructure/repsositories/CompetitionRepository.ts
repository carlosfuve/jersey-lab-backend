import Competition from "../../../../database/models/Competition";
import ICompetition from "../../domain/ICompetition";
import ICompetitionRepository from "../../domain/ICompetitionRepository";


export default class CompetitionRepository implements ICompetitionRepository {
    async existsComp(compId: string): Promise<boolean | null> {
        try {
            const exists: boolean = await Competition.exists(compId);
            return exists;
        } catch (_) {
            return null
        }
    }

    async existsCompByName(compName: string): Promise<boolean | null> {
        try {
            const existName: boolean = await Competition.existsByName(compName);
            return existName;
        } catch (_) {
            return null
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

    async createCompetition(competition: ICompetition): Promise<ICompetition | null> {
        try {
            const competitionCreated: ICompetition = await Competition.createComp(competition);
            return competitionCreated;
        } catch (_) {
            return null
        }
    }

    async updateCompetition(competition: ICompetition): Promise<boolean | null> {
        try {
            const competionUpdated: boolean = await Competition.updateComp(competition);
            return competionUpdated;
        } catch (_) {
            return null
        }
    }

    async deleteCompetition(competitionId: string): Promise<boolean | null> {
        try {
            const competionDeleted: boolean = await Competition.deleteComp(competitionId);
            return competionDeleted;
        } catch (_) {
            return null
        }
    }

}