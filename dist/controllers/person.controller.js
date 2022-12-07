"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restartVotes = exports.updateVotesFinal = exports.updateVotesTwo = exports.updateVotesOne = exports.getPersonsListFinal = exports.getPersonsListTwo = exports.getPersonsListOne = exports.getVoteStatus = exports.endVoteTwo = exports.endVoteOne = exports.addPerson = void 0;
const database_1 = __importDefault(require("../database"));
const person_1 = require("../models/person");
function addPerson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`INSERT INTO persons (name,description,image_url) VALUES ('${req.body.name}','${req.body.description}','${req.body.image_url}') RETURNING *`)
            .then(resp => {
            const data = resp.rows[0];
            res.status(200).json(Object.assign({}, data));
        })
            .catch(err => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
    });
}
exports.addPerson = addPerson;
function endVoteOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`UPDATE vote_status SET status = 'voting_2'`)
            .then(() => {
            res.status(200).json({
                message: 'OK'
            });
        })
            .catch(err => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
    });
}
exports.endVoteOne = endVoteOne;
function endVoteTwo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let final_persons = [];
        yield database_1.default.query(`SELECT * FROM persons_list_one ORDER BY votes_quantity DESC LIMIT 2`)
            .then((resp) => {
            const data = resp.rows;
            data.map(person => {
                final_persons.push(person);
            });
        });
        yield database_1.default.query(`SELECT * FROM persons_list_two ORDER BY votes_quantity DESC LIMIT 2`)
            .then((resp) => {
            const data = resp.rows;
            data.map(person => {
                final_persons.push(person);
            });
        });
        yield database_1.default.query(`INSERT INTO persons_list_final (name,description,image_url) VALUES ${(0, person_1.parsePersons)(final_persons)}`)
            .catch((err) => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
        database_1.default.query(`UPDATE vote_status SET status = 'final'`)
            .then(() => {
            res.status(200).json({
                message: 'OK'
            });
        })
            .catch(err => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
    });
}
exports.endVoteTwo = endVoteTwo;
function getVoteStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`SELECT status FROM vote_status`)
            .then(resp => {
            const data = resp.rows;
            res.status(200).json({
                data
            });
        })
            .catch(err => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
    });
}
exports.getVoteStatus = getVoteStatus;
function getPersonsListOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`SELECT * FROM persons_list_one ORDER BY votes_quantity DESC, name ASC`)
            .then(resp => {
            const data = resp.rows;
            res.status(200).json({
                data
            });
        })
            .catch(err => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
    });
}
exports.getPersonsListOne = getPersonsListOne;
function getPersonsListTwo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`SELECT * FROM persons_list_two ORDER BY votes_quantity DESC, name ASC`)
            .then(resp => {
            const data = resp.rows;
            res.status(200).json({
                data
            });
        })
            .catch(err => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
    });
}
exports.getPersonsListTwo = getPersonsListTwo;
function getPersonsListFinal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`SELECT * FROM persons_list_final ORDER BY votes_quantity DESC, name ASC`)
            .then(resp => {
            const data = resp.rows;
            res.status(200).json({
                data
            });
        })
            .catch(err => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
    });
}
exports.getPersonsListFinal = getPersonsListFinal;
function updateVotesOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`UPDATE persons_list_one SET votes_quantity = votes_quantity + 1 WHERE id = ${req.params.id}`)
            .then(() => {
            res.status(200).json({
                status: 'OK',
                message: 'User voted!'
            });
        })
            .catch(err => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
    });
}
exports.updateVotesOne = updateVotesOne;
function updateVotesTwo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`UPDATE persons_list_two SET votes_quantity = votes_quantity + 1 WHERE id = ${req.params.id}`)
            .then(() => {
            res.status(200).json({
                status: 'OK',
                message: 'User voted!'
            });
        })
            .catch(err => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
    });
}
exports.updateVotesTwo = updateVotesTwo;
function updateVotesFinal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`UPDATE persons_list_final SET votes_quantity = votes_quantity + 1 WHERE id = ${req.params.id}`)
            .then(() => {
            res.status(200).json({
                status: 'OK',
                message: 'User voted!'
            });
        })
            .catch(err => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
    });
}
exports.updateVotesFinal = updateVotesFinal;
function restartVotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`UPDATE persons_list_one, persons_list_two, persons_list_final SET votes_quantity = 0;`)
            .then(() => {
            res.status(200).json({
                status: 'OK',
                message: 'Votes restarted!'
            });
        })
            .catch(err => {
            console.log(err);
            return res.status(400).send({
                status: 'ERROR',
                message: err.message
            });
        });
    });
}
exports.restartVotes = restartVotes;
//# sourceMappingURL=person.controller.js.map