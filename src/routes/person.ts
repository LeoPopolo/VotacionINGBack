import { Router } from 'express';

const router: Router = Router();

import { updateVotes, 
         getPersons,
         addPerson,
         restartVotes
} from '../controllers/person.controller';

router.get('/', getPersons);
router.patch('/:id', updateVotes);
router.patch('/restart', restartVotes);
router.post('/', addPerson);

export default router;