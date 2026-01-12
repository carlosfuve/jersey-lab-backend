import { NextFunction, Request, Response } from "express"
import ExpressResponse from "./ExpressResponse"
export default abstract class Middleware extends ExpressResponse {
    protected constructor() {
        super()
        this.run = this.run.bind(this)
    }
    protected abstract runImplementation(req: Request, res: Response, next: NextFunction): Promise<Response>

    public async run(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            return await this.runImplementation(req, res, next)
        } catch (error: unknown) {
            return this.sendError(res, error)
        }
    }
}