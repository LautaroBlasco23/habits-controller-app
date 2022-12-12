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
const HabitControllers = {
    getUserHabits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userid = req.params.userid;
            const listOfHabits = yield postgres_1.default.getUserHabits(userid);
            if (listOfHabits == null)
                return res.status(200).send("this user doesn't have habits");
            res.status(200).json(listOfHabits);
        });
    },
    getHabitById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const habit = yield postgres_1.default.getHabitById(id);
            if (habit == null)
                return res.status(400).send("habit not found");
            res.status(200).json(habit);
        });
    },
    createHabit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userid, text, date } = req.body;
            const newHabitId = yield postgres_1.default.createHabit({ userid, text, date });
            if (newHabitId == null)
                return res.status(500).send("error creating habit");
            res.status(201).json(newHabitId);
        });
    },
    modifyHabit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { text, date, done } = req.body;
            // check inputs
            if (text == undefined || date == undefined)
                return res.status(400).send("invalid inputs");
            // check if habit exists
            const habit = yield postgres_1.default.getHabitById(id);
            if (habit == null)
                return res.status(400).send("no habit with that id");
            const modifiedHabitId = yield postgres_1.default.modifyHabit(id, { text, date, done });
            if (modifiedHabitId == null)
                return res.status(500).send("server error");
            res.status(200).json(modifiedHabitId);
        });
    },
    deleteHabit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const habit = yield postgres_1.default.getHabitById(req.params.id);
            if (habit == null)
                return res.status(400).send("habit not found");
            const deletedUserId = yield postgres_1.default.deletehabit(req.params.id);
            if (deletedUserId == null)
                return res.status(500).send("server error");
            res.status(200).json(deletedUserId);
        });
    }
};
exports.default = HabitControllers;
