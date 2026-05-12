"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
exports.authService = {
    async register(email, password, name) {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const result = await (0, database_1.query)('INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, role', [email, hashedPassword, name]);
        return result.rows[0];
    },
    async login(email, password) {
        const result = await (0, database_1.query)('SELECT id, email, password, name, role FROM users WHERE email = $1 AND is_active = true', [email]);
        if (result.rows.length === 0) {
            throw new Error('Invalid credentials');
        }
        const user = result.rows[0];
        const isValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
    },
    async getUserById(id) {
        const result = await (0, database_1.query)('SELECT id, email, name, role, is_active, created_at FROM users WHERE id = $1', [id]);
        return result.rows[0];
    },
    async updatePassword(userId, oldPassword, newPassword) {
        const user = await (0, database_1.query)('SELECT password FROM users WHERE id = $1', [userId]);
        if (user.rows.length === 0)
            throw new Error('User not found');
        const isValid = await bcryptjs_1.default.compare(oldPassword, user.rows[0].password);
        if (!isValid)
            throw new Error('Invalid old password');
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await (0, database_1.query)('UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [hashedPassword, userId]);
        return { message: 'Password updated successfully' };
    }
};
//# sourceMappingURL=authService.js.map