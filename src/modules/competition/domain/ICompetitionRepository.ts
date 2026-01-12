import ICompetition from "./ICompetition";

export default interface ICompetitionRepository {
    exists(comp_id: string): Promise<boolean | null>;
    getAllComp(): Promise<ICompetition[] | null>;
}