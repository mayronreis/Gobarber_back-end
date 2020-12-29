import {sign} from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';


interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ) {}

  public async execute ({email, password}: Request): Promise<Response>{
    const user = await this.usersRepository.findByEmail(email)

    if(!user){
      throw new AppError('Incorrect E-mail/Password combination', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(password, user.password);

    if(!passwordMatch){
      throw new AppError('Incorrect E-mail/Password combination', 401);
    }

    const {secret, expiresIn} = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService;