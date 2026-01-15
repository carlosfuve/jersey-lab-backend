import ICompetition from "./ICompetition";

export default interface ICompetitionRepository {
    existsComp(compId: string): Promise<boolean | null>;
    existsCompByName(compName: string): Promise<boolean | null>;
    getAllComp(): Promise<ICompetition[] | null>;
    createCompetition(competition: ICompetition): Promise<ICompetition | null>;
    updateCompetition(competition: ICompetition): Promise<boolean | null>;
    deleteCompetition(competitionId: string): Promise<boolean | null>;
}