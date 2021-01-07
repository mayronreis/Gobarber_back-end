import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
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

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUsersTokensRepository,
    ) {}

  public async execute({ email }: Request): Promise<void> {
      const user = await this.usersRepository.findByEmail(email);

      if(!user){
          throw new AppError('User does not exists.')
      }

      await this.userTokenRepository.generate(user.id);

      this.mailProvider.sendMail(email, 'Pedido de recuperação de senha');
  }
}

export default SendForgotPasswordEmailService;