import { Router } from 'express';

import { WithDraw } from '../controllers/withdraw/WithDrawController';
import {
  FindForBalance,
  StoreClient,
} from '../controllers/clients/ClientsController';
import { ProcessLogin } from '../controllers/clients/LoginController';
import { FindClientStatements } from '../controllers/statements/StatementsController';

const router = Router();

/** CLIENTS */

router.get('/getBalance/:id', FindForBalance);
router.post('/client', StoreClient);

/** WITHDRAW */

router.post('/withdraw/:client', WithDraw);

/** STATEMENTS */

router.get('/statements/:clientId', FindClientStatements);

/** LOGIN */

router.post('/login', ProcessLogin);

export { router };
