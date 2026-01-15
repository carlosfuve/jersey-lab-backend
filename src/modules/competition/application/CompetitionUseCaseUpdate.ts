import IValidationService from "../../shared/domain/IValidationService";
import { ServiceError, ValidationError } from "../../shared/infrastructure/Errors";
import ICompetition from "../domain/ICompetition";
import ICompetitionRepository from "../domain/ICompetitionRepository";
import ICompetitionUseCaseUpdate from "../domain/ICompetitionUseCaseUpdate";

export default class CompetitionUseCaseUpdate implements ICompetitionUseCaseUpdate {
    constructor(
        private readonly competitionRepository: ICompetitionRepository,
        private readonly validationService: IValidationService
    ) { }

    async updateCompetition(competition: ICompetition): Promise<boolean> {
        const { id = "", name, logoUrl } = competition;

        if (this.validationService.isEmpty(id)) throw new ValidationError("The competition id is empty");

        if (this.validationService.isEmpty(name)) throw new ValidationError("The competition name is empty");
        if (this.validationService.isMaxLength(name, 255)) throw new ValidationError("The maximum competition name length is 255");

        if (this.validationService.isEmpty(logoUrl)) throw new ValidationError("The competition logo url is empty");


        const existsComp: boolean | null = await this.competitionRepository.existsComp(id);
        if (!existsComp) throw new ValidationError("The competition id do not exists");

        const existsName: boolean | null = await this.competitionRepository.existsCompByName(name);
        if (existsName) throw new ValidationError("The competition name already exists");


        const updatedCompetition: boolean | null = await this.competitionRepository.updateCompetition(competition);
        if (updatedCompetition === null) throw new ServiceError("Could not update the competition");

        return updatedCompetition;
    }
}