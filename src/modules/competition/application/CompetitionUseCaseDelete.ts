import IValidationService from "../../shared/domain/IValidationService";
import { ServiceError, ValidationError } from "../../shared/infrastructure/Errors";
import ICompetitionRepository from "../domain/ICompetitionRepository";
import ICompetitionUseCaseDelete from "../domain/ICompetitionUseCaseDelete";

export default class CompetitionUseCaseDelete implements ICompetitionUseCaseDelete {
    constructor(
        private readonly competitionRepository: ICompetitionRepository,
        private readonly validationService: IValidationService
    ) { }

    async deleteCompetition(competitionId: string): Promise<boolean> {
        if (this.validationService.isEmpty(competitionId)) throw new ValidationError("The competition id is empty");

        const existsComp: boolean | null = await this.competitionRepository.existsComp(competitionId);
        if (!existsComp) throw new ValidationError("The competition do not exists");

        const deletedComp: boolean | null = await this.competitionRepository.deleteCompetition(competitionId);
        if (deletedComp === null) throw new ServiceError("Could not delete the competition");

        return deletedComp;
    }
}