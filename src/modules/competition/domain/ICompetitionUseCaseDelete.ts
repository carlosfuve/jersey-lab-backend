
export default interface ICompetitionUseCaseDelete {
    deleteCompetition(competitionId: string): Promise<boolean>
}