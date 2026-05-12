"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesService_1 = require("../services/salesService");
const auth_1 = require("../middleware/auth");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const parseIdParam = (value) => {
    if (Array.isArray(value))
        value = value[0];
    return parseInt(value || '0', 10);
};
router.get('/', auth_1.authenticate, async (req, res) => {
    try {
        const filters = {
            status: typeof req.query.status === 'string' ? req.query.status : undefined,
            customer_id: req.query.customer_id ? parseInt(req.query.customer_id, 10) : undefined,
            date_from: typeof req.query.date_from === 'string' ? req.query.date_from : undefined,
            date_to: typeof req.query.date_to === 'string' ? req.query.date_to : undefined,
        };
        const orders = await salesService_1.salesService.getAll(filters);
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:id', auth_1.authenticate, async (req, res) => {
    try {
        const id = parseIdParam(req.params.id);
        const order = await salesService_1.salesService.getById(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/', auth_1.authenticate, (0, auth_1.authorize)('admin', 'super_admin', 'manager', 'sales_rep'), [
    (0, express_validator_1.body)('customer_id').isInt(),
    (0, express_validator_1.body)('items').isArray({ min: 1 })
], async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const authReq = req;
        const order = await salesService_1.salesService.create({
            ...req.body,
            created_by: authReq.user.id
        });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.patch('/:id/status', auth_1.authenticate, (0, auth_1.authorize)('admin', 'super_admin', 'manager'), async (req, res) => {
    try {
        const id = parseIdParam(req.params.id);
        const order = await salesService_1.salesService.updateStatus(id, req.body.status);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=sales.js.map