"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authService_1 = require("../services/authService");
const auth_1 = require("../middleware/auth");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 6 }),
    (0, express_validator_1.body)('name').notEmpty()
], async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await authService_1.authService.register(req.body.email, req.body.password, req.body.name);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').notEmpty()
], async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const result = await authService_1.authService.login(req.body.email, req.body.password);
        res.json(result);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
router.get('/me', auth_1.authenticate, async (req, res) => {
    try {
        const authReq = req;
        const user = await authService_1.authService.getUserById(authReq.user.id);
        res.json(user);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
router.put('/password', auth_1.authenticate, async (req, res) => {
    try {
        const authReq = req;
        const result = await authService_1.authService.updatePassword(authReq.user.id, req.body.oldPassword, req.body.newPassword);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map