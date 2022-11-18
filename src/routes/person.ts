import { Router } from 'express';

const router: Router = Router();

import { updateVotes, 
         getPersons,
         addPerson,
         downloadImage
} from '../controllers/person.controller';

router.get('/', getPersons);
router.patch('/:id', updateVotes);
router.post('/', addPerson);
router.get('/:file_path', downloadImage);

export default router;