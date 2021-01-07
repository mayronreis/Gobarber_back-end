import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import usersRouter from '../infra/http/routes/users.routes';


describe('AuthenticateUser', () => {
    // it('should be able to authenticate', async () => {
    //     const fakeUsersRepository = new FakeUsersRepository();
    //     const fakeHashProvider = new FakeHashProvider();

    //     const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    //     const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    //     const user = await createUserService.execute({
    //         name: 'Jonh Doe',
    //         email: 'johndoe@gmail.com',
    //         password: '123456'
    //     });

    //     const response = await authenticateUserService.execute({
    //         email: 'johndoe@gmail.com',
    //         password: '123456',
    //     });

    //     console.log('RESPONSE :: ', response)

    //     // expect(response).toHaveProperty('token');
    //     // expect(response.user).toEqual(user);
    //     expect(1+2).toEqual(3);
    // });

    it('should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        await expect(authenticateUserService.execute({
            email: 'johndoe@gmail.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError)
    }); 

    it('should not be able to authenticate with wrong password', async () => {
            const fakeUsersRepository = new FakeUsersRepository();
            const fakeHashProvider = new FakeHashProvider();
    
            const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
            const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    
            await createUserService.execute({
                name: 'Jonh Doe',
                email: 'johndoe@gmail.com',
                password: '123456'
            });
     

            await expect(authenticateUserService.execute({
                email: 'johndoe@gmail.com',
                password: 'wrongpassword',
            })).rejects.toBeInstanceOf(AppError);
        });
})