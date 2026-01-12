import IValidationService from "../../domain/IValidationService"

export default class ValidationService implements IValidationService {
    isObjectId(text: string): boolean {
        return text.match(/^[0-9a-fA-F]{24}$/) != null
    }
    isAlpha(text: string): boolean {
        let response = true
        for (const partial of text.trim().split(' ')) {
            response = response && /^[a-zA-Z]+$/.test(partial)
            if (!response) break
        }
        return response
    }
    isAlphanumeric(text: string): boolean {
        let response = true
        for (const partial of text.trim().split(' ')) {
            if (partial.length > 0) {
                response = response && /^([a-zA-Z0-9]+)$/.test(partial)
            } else {
                response = false
            }
            if (!response) break
        }
        return response
    }
    isEmpty(text: string): boolean {
        return text.replace(/\s/g, "").length === 0
    }
    isNotNull(text: string): boolean {
        return text !== undefined && text !== null;
    }
    isMaxLength(text: string, maxLength: number): boolean {
        return text.length >= maxLength
    }
    isNumber(text: string): boolean {
        return /^-?[0-9]+(?:\.[0-9]+)?$/.test(text.toLowerCase())
    }
    isNumberNegative(text: string): boolean {
        return this.isNumber(text) && parseFloat(text) < 0.0
    }
    isNumberZero(text: string): boolean {
        return this.isNumber(text) && parseFloat(text) === 0.0
    }
    isEmail(text: string): boolean {
        return text.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null
    }
    containsLowerCaseLetters(text: string): boolean {
        return /[a-z]/g.test(text)
    }
    containsUpperCaseLetters(text: string): boolean {
        return /[A-Z]/g.test(text)
    }
    containsNumbers(text: string): boolean {
        return /[0-9]/g.test(text)
    }
}