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
const postgres_1 = __importDefault(require("../models/postgres"));
const users_postgres_1 = __importDefault(require("../../../auth/infrastructure/models/users-postgres"));
const UserControllers = {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listOfUsers = yield postgres_1.default.getAllUsers();
            res.status(200).json(listOfUsers);
        });
    },
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            console.log(id);
            const user = yield postgres_1.default.getUserById(id);
            if (user == null)
                return res.status(400).send("user not found");
            res.status(200).json(user);
        });
    },
    modifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { username, email, password } = req.body;
            const isEmailAlreadyOnUse = yield users_postgres_1.default.isEmailAlreadyOnUse(email);
            if (isEmailAlreadyOnUse)
                return res.status(400).send("email already on use");
            const modifiedUserId = yield postgres_1.default.modifyUser(id, { user_id: id, username, email, password });
            if (modifiedUserId == null)
                return res.status(500).send("server error");
            res.status(200).json(modifiedUserId);
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield postgres_1.default.getUserById(req.params.id);
            if (user == null)
                return res.status(400).send("user not found");
            const deletedUserId = yield postgres_1.default.deleteUser(req.params.id);
            if (deletedUserId == null)
                return res.status(500).send("server error");
            res.status(200).json(deletedUserId);
        });
    }
};
exports.default = UserControllers;
