
export default interface IEmailService {
    sendEmail(subject: string, html: string): Promise<boolean | null>;
    getHtmlContact(email: string, message: string): string;
}