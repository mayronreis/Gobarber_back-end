import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';


describe('CreateAppointmen', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository);

        const appointment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '123456',
        })

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    });

    it('should not be able to create two appointment on the same time', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository);

        const appointmentDate = new Date(2020, 4, 11);

        const appointment = await createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123456',
        })

        expect(createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123456',
        })).rejects.toBeInstanceOf(AppError)
    });
})