import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendEmailForgotPasswordEmailService from '@modules/Users/services/SendEmailForgotPasswordEmailService';

export default class ForgotPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
    const sendForgotPasswordEmail = container.resolve(SendEmailForgotPasswordEmailService);
  
    await sendForgotPasswordEmail.execute({
        email,
    });
    
    return response.status(204).json();
    }
}