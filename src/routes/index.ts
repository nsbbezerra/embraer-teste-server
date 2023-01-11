import { Router } from 'express';

import { WithDraw } from '../controllers/withdraw/WithDrawController';
import {
  FindForBalance,
  StoreClient,
} from '../controllers/clients/ClientsController';

const router = Router();

/** CLIENTS */

router.get('/getBalance/:id', FindForBalance);
router.post('/client', StoreClient);

/** WITHDRAW */

router.post('/withdraw/:client', WithDraw);

/** STATEMENTS */

export { router };
