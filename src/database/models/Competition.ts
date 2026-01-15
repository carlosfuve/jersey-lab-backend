import pool from "../init";
import ICompetition from "../../modules/competition/domain/ICompetition";


export default class Competition {
    constructor() { }

    static async exists(compId: string): Promise<boolean> {
        const result = await pool.query('SELECT comp_id FROM competition where comp_id = $1', [compId]);
        return result.rows.length > 0;
    }

    static async existsByName(compName: string): Promise<boolean> {
        const result = await pool.query('SELECT comp_id FROM competition where comp_name = $1', [compName]);
        return result.rows.length > 0;
    }

    static async getAll(): Promise<ICompetition[]> {
        const result = await pool.query('SELECT comp_id as id, comp_name as name, comp_logo_url as logoUrl FROM competition');

        return result.rows;
    }

    static async createComp(competition: ICompetition): Promise<ICompetition> {
        const result = await pool.query(
            'INSERT INTO competition (comp_name, comp_logo_url) VALUES ($1, $2) RETURNING comp_id, comp_name, comp_logo_url',
            [competition.name, competition.name]
        );

        const newObject = result.rows[0];

        return {
            id: newObject.comp_id,
            name: newObject.comp_name,
            logoUrl: newObject.comp_logo_url
        }
    }

    static async updateComp(competition: ICompetition): Promise<boolean> {
        const result = await pool.query(
            `UPDATE competition 
         SET comp_name = COALESCE($1, comp_name),
             comp_logo_url = COALESCE($2, comp_logo_url)
         WHERE comp_id = $3`,
            [competition.name, competition.logoUrl, competition.id]
        );

        const rowsAffected = result.rowCount ?? 0;
        return rowsAffected > 0;

    }

    static async deleteComp(competitionId: string): Promise<boolean> {
        const result = await pool.query('DELETE FROM competition WHERE comp_id = $1', [competitionId]);
        const rowsAffected = result.rowCount ?? 0;
        return rowsAffected > 0;
    }


}