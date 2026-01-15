import ICompetition from "./ICompetition";

export default interface ICompetitionUseCaseUpdate {
    updateCompetition(competition: ICompetition): Promise<boolean>;
}