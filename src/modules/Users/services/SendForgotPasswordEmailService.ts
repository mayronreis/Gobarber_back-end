import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private userTokenRepository: IUsersTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
    ) {}

  public async execute({ email }: Request): Promise<void> {
      const user = await this.usersRepository.findByEmail(email);

      if(!user){
          throw new AppError('User does not exists.')
      }

      const { token } = await this.userTokenRepository.generate(user.id);

      const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

      await this.mailProvider.sendMail({
        to:{
          name: user.name,
          email: user.email,
        },
        subject: '[GoBarber] Recuperação de senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `http://localhost:3000/reset_password?token=${token}`
          },
        },
      });
  }
}

export default SendForgotPasswordEmailService;