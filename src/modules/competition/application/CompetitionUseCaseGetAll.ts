import ICompetition from "../domain/ICompetition";
import ICompetitionRepository from "../domain/ICompetitionRepository";
import ICompetitionUseCaseGetAll from "../domain/ICompetitionUseCaseGetAll";


export default class CompetitonUseCaseGetAll implements ICompetitionUseCaseGetAll {
    constructor(
        private readonly competitionRepository: ICompetitionRepository
    ) { }


    async getAllCompetition(): Promise<ICompetition[]> {
        const competitions: ICompetition[] | null = await this.competitionRepository.getAllComp();
        if (competitions === null) throw Error("Could not found the competitions");
        return competitions;
    }



}