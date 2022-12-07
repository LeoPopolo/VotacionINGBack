"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const person_controller_1 = require("../controllers/person.controller");
router.get('/one', person_controller_1.getPersonsListOne);
router.get('/two', person_controller_1.getPersonsListTwo);
router.get('/final', person_controller_1.getPersonsListFinal);
router.get('/status', person_controller_1.getVoteStatus);
router.patch('/one/:id', person_controller_1.updateVotesOne);
router.patch('/two/:id', person_controller_1.updateVotesTwo);
router.patch('/final/:id', person_controller_1.updateVotesFinal);
router.patch('/restart', person_controller_1.restartVotes);
router.patch('/end_one', person_controller_1.endVoteOne);
router.patch('/end_two', person_controller_1.endVoteTwo);
router.post('/', person_controller_1.addPerson);
exports.default = router;
//# sourceMappingURL=person.js.map