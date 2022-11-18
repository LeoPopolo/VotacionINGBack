"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const router = (0, express_1.Router)();
const user_controller_1 = require("../controllers/user.controller");
router.post('/register/admin', user_controller_1.registerAdmin);
router.post('/register/customer', user_controller_1.registerCustomer);
router.post('/login', user_controller_1.login);
router.get('/:id', verifyToken_1.tokenValidation, user_controller_1.identifyById);
exports.default = router;
//# sourceMappingURL=user.js.map