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
exports.updateVotes = exports.getPersons = exports.addPerson = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
function getPersons(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`SELECT * FROM persons ORDER BY votes_quantity DESC`)
            .then(resp => {
            const data = resp.rows;
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
exports.getPersons = getPersons;
function updateVotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.default.query(`UPDATE persons SET votes_quantity = votes_quantity + 1 WHERE id = ${req.params.id}`)
            .then(resp => {
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
exports.updateVotes = updateVotes;
//# sourceMappingURL=person.controller.js.map