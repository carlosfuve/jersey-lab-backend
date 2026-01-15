import IValidationService from "../../shared/domain/IValidationService";
import { ServiceError, ValidationError } from "../../shared/infrastructure/Errors";
import ICompetition from "../domain/ICompetition";
import ICompetitionRepository from "../domain/ICompetitionRepository";
import ICompetitionUseCaseCreate from "../domain/ICompetitionUseCaseCreate";

export default class CompetitionUseCaseCreate implements ICompetitionUseCaseCreate {

    constructor(
        private readonly competitionRepository: ICompetitionRepository,
        private readonly validationService: IValidationService
    ) { }

    async createNewCompetition(competition: ICompetition): Promise<ICompetition> {
        const { name, logoUrl } = competition;

        if (this.validationService.isEmpty(name)) throw new ValidationError("The competition name is empty");
        if (this.validationService.isMaxLength(name, 255)) throw new ValidationError("The maximum competition name length is 255");

        if (this.validationService.isEmpty(logoUrl)) throw new ValidationError("The competition logo url is empty");

        const existsComp: boolean | null = await this.competitionRepository.existsCompByName(name);
        if (existsComp) throw new ValidationError("The competition name already exists");


        const newCompetition: ICompetition | null = await this.competitionRepository.createCompetition(competition);
        if (newCompetition === null) throw new ServiceError("Could not create the competition")
        return newCompetition;
    }

}