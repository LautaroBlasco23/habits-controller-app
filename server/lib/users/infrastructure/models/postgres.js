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
;
class UsersPostgresControllers {
    constructor() {
        this.pool = new pg_1.Pool({
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                const queryResult = yield this.pool.query(`
            SELECT id, email, username
            FROM ${process.env.DB_USERS_TABLE}
            `);
                return queryResult.rows;
            }
            catch (error) {
                if (process.env.NODE_ENV == "development")
                    console.log(error);
                return null;
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                const queryResult = yield this.pool.query(`
            SELECT id, email, username
            from ${process.env.DB_USERS_TABLE}
            WHERE id=$1
            `, [id]);
                return queryResult.rows[0];
            }
            catch (error) {
                if (process.env.NODE_ENV == "development")
                    console.log(error);
                return null;
            }
        });
    }
    modifyUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                const { username, email, password } = user;
                yield this.pool.query(`
            UPDATE ${process.env.DB_USERS_TABLE}
            SET username = $1,
                email = $2,
                password = $3
            WHERE id=$4;
            `, [username, email, password, id]);
                return id;
            }
            catch (error) {
                if (process.env.NODE_ENV == "development")
                    console.log(error);
                return null;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                yield this.pool.query(`
            DELETE FROM ${process.env.DB_USERS_TABLE}
            WHERE id = $1 
            `, [id]);
                return id;
            }
            catch (error) {
                if (process.env.NODE_ENV == "development")
                    console.log(error);
                return null;
            }
        });
    }
}
exports.default = new UsersPostgresControllers();
