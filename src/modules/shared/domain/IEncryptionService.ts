export default interface IEncryptionService
{
    applyHash(text:string):Promise<string>
    compareHash(plainText:string, hashedText:string):Promise<boolean>
}