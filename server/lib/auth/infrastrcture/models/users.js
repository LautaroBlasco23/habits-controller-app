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
const pg_1 = require("pg");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
require("dotenv/config");
;
class AuthDatabaseController {
    constructor() {
        this.pool = new pg_1.Pool({
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                const queryResult = yield this.pool.query(`
            SELECT * 
            FROM ${process.env.DB_USERS_TABLE}
            WHERE email=$1
            `, [email]);
                if (queryResult.rows.length == 0)
                    throw Error('not user with that email');
                return queryResult.rows[0];
            }
            catch (error) {
                if (process.env.NODE_ENV == "development")
                    console.log(error);
                return null;
            }
        });
    }
    isEmailAlreadyOnUse(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                const queryResult = yield this.pool.query(`
            SELECT id 
            FROM ${process.env.DB_USERS_TABLE}
            WHERE email=$1
            `, [email]);
                if (queryResult.rows.length == 0)
                    return false;
                return true;
            }
            catch (error) {
                if (process.env.NODE_ENV == "development")
                    console.log(error);
                return null;
            }
        });
    }
    createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                const { email, username, password } = user;
                const id = (0, uuid_1.v4)();
                const encryptedPassword = yield bcrypt_1.default.hash(password, Number(process.env.SALT_ROUNDS));
                yield this.pool.query(`
            INSERT INTO ${process.env.DB_USERS_TABLE}
            (id, email, username, password)
            VALUES
            ($1, $2, $3, $4)
            `, [id, email, username, encryptedPassword]);
                return id;
            }
            catch (error) {
                if (process.env.NODE_ENV == "development")
                    console.log(error);
                return null;
            }
        });
    }
    getEncryptedPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                const queryResult = yield this.pool.query(`
            SELECT password 
            FROM ${process.env.DB_USERS_TABLE}
            WHERE email = $1
            `, [email]);
                return queryResult.rows[0].password;
            }
            catch (error) {
                if (process.env.NODE_ENV == "development")
                    console.log(error);
                return null;
            }
        });
    }
}
exports.default = new AuthDatabaseController();