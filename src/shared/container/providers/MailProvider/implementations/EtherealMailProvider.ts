import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';



export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(){
        nodemailer.createTestAccount().then(account =>{
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });
            this.client = transporter;
        })
    }

    public async sendMail(to: string, body: string): Promise<void> {
        this.client.sendMail({
            from: 'Equipe GoBarber <contato@gobarber.com.br>',
            to,
            subject: 'Recuperação de Senha',
            text: body,
        });
    }
        
}