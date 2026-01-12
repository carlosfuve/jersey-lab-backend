import IToken from "./IToken"

export default interface ITokenService
{
    encodeJsonWebToken(payload:IToken):string|null
    decodeJsonWebToken(token:string):IToken|null
}