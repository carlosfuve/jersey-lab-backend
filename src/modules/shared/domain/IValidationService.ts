export default interface IValidationService {
    isObjectId(text: string): boolean
    isAlpha(text: string): boolean
    isAlphanumeric(text: string): boolean
    isEmpty(text: string): boolean
    isNotNull(text: string): boolean
    isMaxLength(text: string, maxLength: number): boolean
    isNumber(text: string): boolean
    isNumberNegative(text: string): boolean
    isNumberZero(text: string): boolean
    isEmail(text: string): boolean
    containsLowerCaseLetters(text: string): boolean
    containsUpperCaseLetters(text: string): boolean
    containsNumbers(text: string): boolean
}