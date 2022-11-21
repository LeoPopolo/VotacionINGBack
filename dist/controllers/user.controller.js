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
exports.identifyById = exports.login = exports.registerCustomer = exports.registerAdmin = void 0;
const user_1 = require("../models/user");
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function registerAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tmp_password = yield (0, user_1.encryptPassword)(req.body.password);
        database_1.default.query(`SELECT webapi_register_admin(
                                '${req.body.name}',
                                '${req.body.surname}',
                                '${req.body.username}',
                                '${tmp_password}',
                                '${req.body.contact_information.email}',
                                '${req.body.contact_information.phone_number}',
                                '${req.body.contact_information.address}'
                            )`)
            .then(resp => {
            const token = jsonwebtoken_1.default.sign({
                _id: req.body.username
            }, process.env.TOKEN_SECRET);
            const data = JSON.parse(resp.rows[0].webapi_register_admin);
            delete data.user.personal_data.password;
            delete data.user.deleted;
            delete data.user.creation_timestamp;
            res.status(200).json(Object.assign(Object.assign({}, data), { token }));
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
exports.registerAdmin = registerAdmin;
function registerCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tmp_password = yield (0, user_1.encryptPassword)(req.body.password);
        database_1.default.query(`SELECT webapi_register_customer(
                                '${req.body.name}',
                                '${req.body.surname}',
                                '${req.body.username}',
                                '${tmp_password}',
                                '${req.body.contact_information.email}',
                                '${req.body.contact_information.phone_number}',
                                '${req.body.contact_information.address}'
                            )`)
            .then(resp => {
            const token = jsonwebtoken_1.default.sign({
                _id: req.body.username
            }, process.env.TOKEN_SECRET);
            const data = JSON.parse(resp.rows[0].webapi_register_customer);
            delete data.user.personal_data.password;
            delete data.user.deleted;
            delete data.user.creation_timestamp;
            res.status(200).json(Object.assign(Object.assign({}, data), { token }));
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
exports.registerCustomer = registerCustomer;
function login(req, res) {
    database_1.default.query(`SELECT webapi_login('${req.body.username}')`)
        .then((resp) => __awaiter(this, void 0, void 0, function* () {
        const user = JSON.parse(resp.rows[0].webapi_login);
        const correctPassword = yield (0, user_1.validatePassword)(req.body.password, user.personal_data.password);
        if (!correctPassword) {
            return res.status(400).json({
                error: 'invalid password'
            });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user.id
        }, process.env.TOKEN_SECRET);
        delete user.personal_data.password;
        delete user.deleted;
        delete user.creation_timestamp;
        res.header('Authorization', token).json({
            data: user
        });
    }))
        .catch(err => {
        console.log(err);
        return res.status(400).send({
            status: 'ERROR',
            message: err.message
        });
    });
}
exports.login = login;
function identifyById(req, res) {
    database_1.default.query(`SELECT webapi_auth_user_identify_by_id(${req.params.id})`)
        .then(resp => {
        const user = JSON.parse(resp.rows[0].webapi_auth_user_identify_by_id);
        delete user.user.personal_data.password;
        delete user.user.deleted;
        delete user.user.creation_timestamp;
        res.status(200).json(Object.assign({}, user));
    })
        .catch(err => {
        console.log(err);
        return res.status(400).send({
            status: 'ERROR',
            message: err.message
        });
    });
}
exports.identifyById = identifyById;
//# sourceMappingURL=user.controller.js.map