import IEncryptionService from "../../domain/IEncryptionService"
import bcrypt from "bcrypt"

export default class EncryptionService implements IEncryptionService
{
    private readonly salt:string

    constructor(){
        this.salt = bcrypt.genSaltSync(12)
    }

    async applyHash(text:string):Promise<string>
    {
        return await bcrypt.hash(text, this.salt)
    }

    async compareHash(plainText:string, hashedText:string):Promise<boolean>
    {
        return await bcrypt.compare(plainText, hashedText)
    }

}