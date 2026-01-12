import 'dotenv/config';
import nodemailer from 'nodemailer';
import IEmailService from "../../domain/IEmailService";

export default class EmailService implements IEmailService {

    async sendEmail(subject: string, html: string): Promise<boolean | null> {
        try {
            const EMAIL_HOST: string = process.env.EMAIL_HOST as string || "";
            const EMAIL_PORT: number = parseInt(process.env.EMAIL_PORT as string || "4321", 10);
            const EMAIL_USER: string = process.env.EMAIL_USER as string || "";
            const EMAIL_PSW: string = process.env.EMAIL_PSW as string || "";

            const transporter = nodemailer.createTransport({
                host: EMAIL_HOST,
                port: EMAIL_PORT,
                secure: EMAIL_PORT == 465,
                auth: {
                    user: EMAIL_USER,
                    pass: EMAIL_PSW
                }
            });

            // const EMAIL_SENDER: string = process.env.EMAIL_SENDER as string || "";
            const EMAIL_RECEIVER_1: string = process.env.EMAIL_RECEIVER_1 as string || "";
            const EMAIL_RECEIVER_2: string = process.env.EMAIL_RECEIVER_2 as string || "";

            const mailOptions = {
                from: EMAIL_USER,
                to: [EMAIL_RECEIVER_1, EMAIL_RECEIVER_2],
                subject: subject,
                html: html
            };

            await transporter.sendMail(mailOptions);

            return true;
        } catch (err) {
            console.log(err)
            return null;
        }

        throw new Error("Method not implemented.");
    }

    getHtmlContact(email: string, message: string): string {
        return `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Nuevo Contacto</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f7;
                            color: #333;
                            padding: 20px;
                        }
                        .container {
                            background-color: #fff;
                            border-radius: 8px;
                            padding: 20px;
                            max-width: 600px;
                            margin: auto;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        }
                        h2 {
                            color: #2c3e50;
                        }
                        p {
                            font-size: 16px;
                            line-height: 1.5;
                        }
                        .label {
                            font-weight: bold;
                            margin-top: 15px;
                            display: block;
                        }
                        .message-box {
                            background-color: #f0f0f5;
                            border-left: 4px solid #3498db;
                            padding: 10px 15px;
                            margin-top: 5px;
                            white-space: pre-wrap;
                            font-style: italic;
                            color: #555;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                    <h2>Nuevo contacto recibido</h2>
                    <p>Se ha recibido una nueva solicitud de información a través del formulario de contacto.</p>
                    <span class="label">Correo del contacto:</span>
                    <p>${email}</p>
                    <span class="label">Mensaje:</span>
                    <div class="message-box">${message}</div>
                    </div>
                </body>
                </html>
            `;
    }

}