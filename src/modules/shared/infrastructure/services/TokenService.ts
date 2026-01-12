import { sign, verify } from "jsonwebtoken"
import IToken from "../../domain/IToken"
import ITokenService from "../../domain/ITokenService"
import { ValidationError } from "../Errors"
import IValidationService from "../../domain/IValidationService"
export default class TokenService implements ITokenService {
    private readonly secret: string
    private readonly expirationDays: string

    constructor(private readonly validationService: IValidationService) {
        if (typeof process.env.BACKEND_SERVICE_TOKEN_SECRET === 'undefined') throw new ValidationError('Missing BACKEND_SERVICE_TOKEN_SECRET environment variable')
        if (typeof process.env.BACKEND_SERVICE_TOKEN_EXPIRATION == 'undefined') throw new ValidationError('Missing BACKEND_SERVICE_TOKEN_EXPIRATION environment variable')
        this.secret = process.env.BACKEND_SERVICE_TOKEN_SECRET
        this.expirationDays = process.env.BACKEND_SERVICE_TOKEN_EXPIRATION

        if (!validationService.containsLowerCaseLetters(this.secret)) throw new ValidationError("The secret text should contain lowercase letters")
        if (!validationService.containsUpperCaseLetters(this.secret)) throw new ValidationError("The secret text should contain uppercase letters")
        if (!validationService.containsNumbers(this.secret)) throw new ValidationError("The secret text should contain numbers")

        if (validationService.isNumberNegative(this.expirationDays)) throw new ValidationError("Expiration days cannot be negative")
        if (validationService.isNumberZero(this.expirationDays)) throw new ValidationError("Expiration days cannot be zero")
    }

    encodeJsonWebToken(payload: IToken): string | null {
        try {
            if (!this.validationService.isNumber(`${payload.id}`)) throw new ValidationError('Account id is incorrect or malformed')
            if (this.validationService.isNumberZero(`${payload.id}`)) throw new ValidationError('Account id is incorrect or malformed')
            if (this.validationService.isNumberNegative(`${payload.id}`)) throw new ValidationError('Account id is incorrect or malformed')
            if (!this.validationService.isEmail(payload.email)) throw new ValidationError('Email field is malformed or invalid')

            const expirationDays: number = parseInt(this.expirationDays, 10);
            return sign(payload, this.secret, { expiresIn: `${expirationDays}d` })
        } catch (_) {
            return null
        }
    }

    decodeJsonWebToken(token: string): IToken | null {
        try {
            if (token.length < 5) throw new ValidationError("The token string length should contain at least five elements")
            if (token.split('.').length != 3) throw new ValidationError("The token is malformed")
            const extracted = verify(token, this.secret)
            return extracted as IToken
        } catch (_) {
            return null
        }
    }
}
