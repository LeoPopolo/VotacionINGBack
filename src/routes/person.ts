import { Router } from 'express';

const router: Router = Router();

import { updateVotesOne, 
         updateVotesTwo, 
         updateVotesFinal, 
         getPersonsListOne,
         getPersonsListTwo,
         getPersonsListFinal,
         addPerson,
         getVoteStatus,
         restartVotes,
         endVoteOne,
         endVoteTwo
} from '../controllers/person.controller';

router.get('/one', getPersonsListOne);
router.get('/two', getPersonsListTwo);
router.get('/final', getPersonsListFinal);
router.get('/status', getVoteStatus);
router.patch('/one/:id', updateVotesOne);
router.patch('/two/:id', updateVotesTwo);
router.patch('/final/:id', updateVotesFinal);
router.patch('/restart', restartVotes);
router.patch('/end_one', endVoteOne);
router.patch('/end_two', endVoteTwo);
router.post('/', addPerson);

export default router;