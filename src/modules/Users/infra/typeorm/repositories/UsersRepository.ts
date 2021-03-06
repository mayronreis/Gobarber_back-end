import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/Users/dtos/ICreateUserDTO';


class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }
  
  public async findById(id: string): Promise<User | undefined> {
      const user = await this.ormRepository.findOne(id);

      return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
        where: { email }
    });

    return user;
  }


  public async create(userData: ICreateUsersDTO): Promise<User>{
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User>{
    return this.ormRepository.save(user); 
  }
  
}

export default UsersRepository;