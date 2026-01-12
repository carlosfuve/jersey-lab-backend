import pool from "../init";
import ICompetition from "../../modules/competition/domain/ICompetition";


export default class Competition {
    constructor() { }

    static async exists(comp_id: string): Promise<boolean> {
        const result = await pool.query('SELECT comp_id FROM competition where comp_id = $1', [comp_id]);
        return result.rows.length > 0;
    }

    static async getAll(): Promise<ICompetition[]> {
        const result = await pool.query('SELECT comp_id as id, comp_name as name, comp_logo_url as logoUrl FROM competition');

        return result.rows;
    }

}