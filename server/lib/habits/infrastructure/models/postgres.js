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
const uuid_1 = require("uuid");
class HabitPostgresControllers {
    constructor() {
        this.pool = new pg_1.Pool({
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
    }
    getUserHabits(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                const queryResult = yield this.pool.query(`
            SELECT id, userid, text, date, done
            FROM ${process.env.DB_HABITS_TABLE}
            WHERE userid = $1
            `, [userid]);
                return queryResult.rows;
            }
            catch (error) {
                if (process.env.NODE_ENV == "development")
                    console.log(error);
                return null;
            }
        });
    }
    getHabitById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                const queryResult = yield this.pool.query(`
            SELECT id, userid, text, date, done
            from ${process.env.DB_HABITS_TABLE}
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
    createHabit(habit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                const { text, date, userid } = habit;
                const id = (0, uuid_1.v4)();
                yield this.pool.query(`
            INSERT INTO ${process.env.DB_HABITS_TABLE}
            (id, userid, text, date, done)
            VALUES
            ($1, $2, $3, $4, $5)
            `, [id, userid, text, date, false]);
                return id;
            }
            catch (error) {
                if (process.env.NODE_ENV == "development")
                    console.log(error);
                return null;
            }
        });
    }
    modifyHabit(id, habit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                const { text, date, done } = habit;
                yield this.pool.query(`
            UPDATE ${process.env.DB_HABITS_TABLE}
            SET text = $1,
                date = $2,
                done = $3
            WHERE id=$4;
            `, [text, date, done, id]);
                return id;
            }
            catch (error) {
                if (process.env.NODE_ENV == "development")
                    console.log(error);
                return null;
            }
        });
    }
    deletehabit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                yield this.pool.query(`
            DELETE FROM ${process.env.DB_HABITS_TABLE}
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
;
exports.default = new HabitPostgresControllers();
