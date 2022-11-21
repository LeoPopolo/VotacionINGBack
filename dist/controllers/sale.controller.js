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
exports.searchSales = exports.cancelSale = exports.confirmSale = exports.createSale = void 0;
const sale_1 = require("../models/sale");
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createSale(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = jsonwebtoken_1.default.decode(req.headers.authorization);
        const token_id = data._id;
        const parsedItems = (0, sale_1.parseSaleItems)(req.body.items);
        console.log(`SELECT webapi_create_sale(
        ${parsedItems},
        ${token_id},
        '${req.body.payment_method}',
        '${req.body.discount}'
    )`);
        database_1.default.query(`SELECT webapi_create_sale(
                                ${parsedItems},
                                ${token_id},
                                '${req.body.payment_method}',
                                '${req.body.discount}'
                            )`)
            .then(resp => {
            const data = JSON.parse(resp.rows[0].webapi_create_sale);
            delete data.sale.deleted;
            delete data.sale.customer.deleted;
            delete data.sale.customer.personal_data.password;
            delete data.sale.customer.creation_timestamp;
            data.sale.products.forEach(item => {
                delete item.brand.deleted;
                delete item.brand.creation_timestamp;
            });
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
exports.createSale = createSale;
function confirmSale(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = jsonwebtoken_1.default.decode(req.headers.authorization);
        const token_id = data._id;
        database_1.default.query(`SELECT webapi_confirm_sale(
                                ${req.params.id},
                                ${token_id}
                            )`)
            .then(resp => {
            const data = JSON.parse(resp.rows[0].webapi_confirm_sale);
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
exports.confirmSale = confirmSale;
function cancelSale(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = jsonwebtoken_1.default.decode(req.headers.authorization);
        const token_id = data._id;
        database_1.default.query(`SELECT webapi_cancel_sale(
                                ${req.params.id},
                                ${token_id}
                            )`)
            .then(resp => {
            const data = JSON.parse(resp.rows[0].webapi_cancel_sale);
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
exports.cancelSale = cancelSale;
function searchSales(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = req.query.page;
        let total = req.query.total ? req.query.total : null;
        let payment_method = req.query.payment_method ? `'${req.query.payment_method}'` : null;
        let status = req.query.status ? `'${req.query.status}'` : null;
        let date_from = req.query.date_from ? `'${req.query.date_from}'` : null;
        let date_to = req.query.date_to ? `'${req.query.date_to}'` : null;
        database_1.default.query(`SELECT webapi_search_sales(
                                ${page},
                                ${total},
                                ${payment_method},
                                ${status},
                                ${date_from},
                                ${date_to}
                            )`)
            .then(resp => {
            const data = JSON.parse(resp.rows[0].webapi_search_sales);
            data.sales.forEach(item => {
                delete item.deleted;
                delete item.customer.deleted;
                delete item.customer.personal_data.password;
                delete item.customer.creation_timestamp;
                item.products.forEach(product => {
                    delete product.brand.creation_timestamp;
                    delete product.brand.deleted;
                });
            });
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
exports.searchSales = searchSales;
//# sourceMappingURL=sale.controller.js.map