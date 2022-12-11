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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv/config");
class AuthDatabaseController {
    constructor() {
        this.pool = new pg_1.Pool({
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
    }
    getUserByEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.connect();
            const queryResult = yield this.pool.query(`
        SELECT * 
        FROM ${process.env.DB_USERS_TABLE}
        `);
            return queryResult.rows;
        });
    }
    isEmailAlreadyOnUse(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.connect();
            const queryResult = yield this.pool.query(`
        SELECT id 
        FROM ${process.env.DB_USERS_TABLE}
        `);
        });
    }
    createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new AuthDatabaseController();
