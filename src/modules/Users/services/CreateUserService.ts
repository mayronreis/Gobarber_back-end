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

    console.log('AQUI 001')

    if(checkUserExists){
      throw new AppError('Email address already used.')
    }

    console.log('AQUI 002')

    const hashPassword = await this.hashProvider.generateHash(password)
    console.log('AQUI 003')

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });
    console.log('AQUI 004')
    return user;
  }
}

export default CreateUserService;