"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productService_1 = require("../services/productService");
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
            category: typeof req.query.category === 'string' ? req.query.category : undefined,
            search: typeof req.query.search === 'string' ? req.query.search : undefined,
            warehouse: typeof req.query.warehouse === 'string' ? req.query.warehouse : undefined,
        };
        const products = await productService_1.productService.getAll(filters);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:id', auth_1.authenticate, async (req, res) => {
    try {
        const id = parseIdParam(req.params.id);
        const product = await productService_1.productService.getById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/', auth_1.authenticate, (0, auth_1.authorize)('admin', 'super_admin', 'manager'), [
    (0, express_validator_1.body)('sku').notEmpty(),
    (0, express_validator_1.body)('name').notEmpty(),
    (0, express_validator_1.body)('cost_price').isNumeric(),
    (0, express_validator_1.body)('selling_price').isNumeric()
], async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const product = await productService_1.productService.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.put('/:id', auth_1.authenticate, (0, auth_1.authorize)('admin', 'super_admin', 'manager'), async (req, res) => {
    try {
        const id = parseIdParam(req.params.id);
        const product = await productService_1.productService.update(id, req.body);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)('super_admin'), async (req, res) => {
    try {
        const id = parseIdParam(req.params.id);
        await productService_1.productService.delete(id);
        res.json({ message: 'Product deleted' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/:id/stock', auth_1.authenticate, async (req, res) => {
    try {
        const id = parseIdParam(req.params.id);
        const stock = await productService_1.productService.getStock(id);
        res.json(stock);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=products.js.map