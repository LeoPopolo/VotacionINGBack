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
exports.searchProducts = exports.identifyById = exports.deleteProduct = exports.createProduct = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = jsonwebtoken_1.default.decode(req.headers.authorization);
        const token_id = data._id;
        const image_path = req.body.image ? `'${req.body.image}'` : null;
        database_1.default.query(`SELECT webapi_create_product(
                                 ${token_id},
                                '${req.body.name}',
                                '${req.body.description}',
                                ${req.body.price},
                                ${req.body.stock},
                                ${req.body.brand},
                                ${image_path}
                            )`)
            .then(resp => {
            const product = JSON.parse(resp.rows[0].webapi_create_product);
            delete product.product.brand.deleted;
            delete product.product.brand.creation_timestamp;
            delete product.product.deleted;
            delete product.product.creation_timestamp;
            res.status(200).json(Object.assign({}, product));
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
exports.createProduct = createProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = jsonwebtoken_1.default.decode(req.headers.authorization);
        const token_id = data._id;
        database_1.default.query(`SELECT webapi_delete_product(
                                ${token_id},
                                ${req.params.id}
                            )`)
            .then(resp => {
            const data = JSON.parse(resp.rows[0].webapi_delete_product);
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
exports.deleteProduct = deleteProduct;
function identifyById(req, res) {
    database_1.default.query(`SELECT webapi_product_identify_by_id(${req.params.id})`)
        .then(resp => {
        const product = JSON.parse(resp.rows[0].webapi_product_identify_by_id);
        if (product.product) {
            delete product.product.deleted;
            delete product.product.creation_timestamp;
            delete product.product.brand.deleted;
            delete product.product.brand.creation_timestamp;
        }
        res.status(200).json(Object.assign({}, product));
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
function searchProducts(req, res) {
    const page = req.query.page;
    const filter = req.query.filter ? `'${req.query.filter}'` : null;
    database_1.default.query(`SELECT webapi_search_products(${page}, ${filter})`)
        .then(resp => {
        const products = JSON.parse(resp.rows[0].webapi_search_products);
        res.status(200).json(Object.assign({}, products));
    })
        .catch(err => {
        console.log(err);
        return res.status(400).send({
            status: 'ERROR',
            message: err.message
        });
    });
}
exports.searchProducts = searchProducts;
//# sourceMappingURL=product.controller.js.map