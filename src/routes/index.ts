import { Router } from 'express';

import { WithDraw } from '../controllers/withdraw/WithDrawController';
import { FindForBalance } from '../controllers/clients/ClientsController';

const router = Router();

/** CLIENTS */

router.get('/clientBalance', FindForBalance);

/** WITHDRAW */

router.post('/withdraw/:client', WithDraw);

/** STATEMENTS */

export { router };
