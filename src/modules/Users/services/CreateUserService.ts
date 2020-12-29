import {hash} from 'bcryptjs'
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ) {}

  public async execute({name, email, password}: Request): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if(checkUserExists){
      throw new AppError('Email address already used.')
    }

    const hashPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });    
    return user;
  }
}

export default CreateUserService;