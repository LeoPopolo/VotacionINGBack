"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const router = (0, express_1.Router)();
const product_controller_1 = require("../controllers/product.controller");
router.post('/', verifyToken_1.tokenValidation, product_controller_1.createProduct);
router.get('/:id', product_controller_1.identifyById);
router.get('/', product_controller_1.searchProducts);
router.delete('/:id', verifyToken_1.tokenValidation, product_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.js.map