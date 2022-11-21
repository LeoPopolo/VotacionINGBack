import { Router } from 'express';

const router: Router = Router();

import { updateVotes, 
         getPersons,
         addPerson
} from '../controllers/person.controller';

router.get('/', getPersons);
router.patch('/:id', updateVotes);
router.post('/', addPerson);

export default router;