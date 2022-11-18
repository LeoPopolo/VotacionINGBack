"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const person_controller_1 = require("../controllers/person.controller");
router.get('/', person_controller_1.getPersons);
router.patch('/:id', person_controller_1.updateVotes);
router.post('/', person_controller_1.addPerson);
exports.default = router;
//# sourceMappingURL=person.js.map