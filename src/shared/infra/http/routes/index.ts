import {Router} from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import userstRouter from '@modules/users/infra/http/routes/users.routes';
import sessionstRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', userstRouter);
routes.use('/sessions', sessionstRouter);

export default routes;