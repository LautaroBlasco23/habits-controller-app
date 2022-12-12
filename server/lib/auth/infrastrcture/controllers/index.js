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
const tokens_1 = __importDefault(require("../models/tokens"));
const users_1 = __importDefault(require("../models/users"));
const register_form_checker_1 = __importDefault(require("../utils/register-form-checker"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
    Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            const inputError = (0, register_form_checker_1.default)(username, email, password);
            if (inputError != null)
                return res.status(400).send(inputError);
            if (yield users_1.default.isEmailAlreadyOnUse(email))
                return res.status(400).send("Email already on use");
            const newUserId = yield users_1.default.createNewUser({ username, email, password });
            if (newUserId == null)
                return res.status(500).send("error creating user");
            const userToken = tokens_1.default.generateToken({ id: newUserId, username });
            res.status(201).json({ newUserId, userToken });
        });
    }
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (users_1.default.getUserByEmail(email) == null)
                return res.status(400).send("not user with that email");
            const encryptedPassword = yield users_1.default.getEncryptedPassword(email);
            if (encryptedPassword == null)
                return res.status(500).send("Server error");
            if (!(yield bcrypt_1.default.compare(password, encryptedPassword)))
                return res.status(400).send("invalid credentials");
            const userData = yield users_1.default.getUserByEmail(email);
            if (userData == null)
                return res.status(500).send("Server error");
            const { user_id, username } = userData;
            const userToken = tokens_1.default.generateToken({ id: user_id, username });
            res.status(200).json(userToken);
        });
    }
}
exports.default = new AuthController();
