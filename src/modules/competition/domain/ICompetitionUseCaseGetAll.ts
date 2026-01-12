import ICompetition from "./ICompetition";

export default interface ICompetitionUseCaseGetAll {
    getAllCompetition(): Promise<ICompetition[]>;
}