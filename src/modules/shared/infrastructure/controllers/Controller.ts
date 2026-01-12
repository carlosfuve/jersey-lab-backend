import ExpressResponse from "./ExpressResponse"
import { Request, Response } from "express"

export default abstract class Controller extends ExpressResponse {
    protected constructor() {
        super()
        this.run = this.run.bind(this)
    }

    protected abstract runImplementation(req: Request, res: Response): Promise<Response>

    public async run(req: Request, res: Response): Promise<Response> {
        try {
            return await this.runImplementation(req, res)
        } catch (error: unknown) {
            return this.sendError(res, error)
        }
    }
}