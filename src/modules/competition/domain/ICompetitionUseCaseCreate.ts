import ICompetition from "./ICompetition";

export default interface ICompetitionUseCaseCreate {
    createNewCompetition(competition: ICompetition): Promise<ICompetition>
}