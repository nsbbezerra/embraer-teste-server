import { Router } from 'express';

import { WithDraw } from '../controllers/withdraw/WithDrawController';
import {
  FindForBalance,
  StoreClient,
} from '../controllers/clients/ClientsController';
import { ProcessLogin } from '../controllers/clients/LoginController';
import { FindClientStatements } from '../controllers/statements/StatementsController';
import { GetBanknotesStock } from '../controllers/banknotes/BanknotesController';

const router = Router();

/** CLIENTS */

router.get('/getBalance/:id', FindForBalance);
router.post('/client', StoreClient);

/** WITHDRAW */

router.post('/withdraw/:client', WithDraw);

/** STATEMENTS */

router.get('/statements/:clientId', FindClientStatements);

/** BANKNOTES */

router.get('/banknotes', GetBanknotesStock);

/** LOGIN */

router.post('/login', ProcessLogin);

export { router };
