import { container } from 'tsyringe';

import '@modules/Users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IApointmentsRepository';
import AppointmentsRepository from  '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import UsersRepository from  '@modules/Users/infra/typeorm/repositories/UsersRepository';

import IUsersTokensRepository from '@modules/Users/repositories/IUsersTokensRepository';
import UsersTokensRepository from  '@modules/Users/infra/typeorm/repositories/UserTokenRepository';

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
); 

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
); 

container.registerSingleton<IUsersTokensRepository>(
    'UsersTokensRepository',
    UsersTokensRepository,
); 