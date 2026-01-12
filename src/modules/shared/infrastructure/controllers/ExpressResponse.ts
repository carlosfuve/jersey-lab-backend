import { Response } from "express"
import { ConflictError, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from "../Errors"

export default class ExpressResponse {
    sendError(res: Response, error: unknown): Response {
        let code = 500
        let message = 'Unexpected error ocurred, try again later.'
        if (error instanceof ValidationError) {
            code = 400
            message = error.message
        }
        if (error instanceof NotFoundError) {
            code = 404
            message = error.message
        }
        if (error instanceof UnauthorizedError) {
            code = 401
            message = error.message
        }
        if (error instanceof ForbiddenError) {
            code = 403
            message = error.message
        }
        if (error instanceof ConflictError) {
            code = 409
            message = error.message
        }
        if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
            // Cualquier otro error que tenga un mensaje
            message = (error as any).message;
        }
        return res.status(code).json({ code, message })
    }
    sendJsonResponse(res: Response, code: number, obj: unknown): Response {
        return res.status(code).json(obj)
    }
}