import {Request, Response} from "express";
import HabitPostgresControllers from "../models/postgres";
import HabitEntity from "../../entities/habit.entity";

const HabitControllers = {
    async getUserHabits(req: Request, res: Response) {
        const userid = req.params.userid;
        const listOfHabits = await HabitPostgresControllers.getUserHabits(userid);
        if( listOfHabits == null ) return res.status(500).send("Error getting habits") 
        if( listOfHabits.length == 0 ) return res.status(400).send("this user doesn't have habits") 

        res.status(200).json(listOfHabits);
    },

    async getHabitById(req: Request, res: Response) {
        const id: string = req.params.id;

        const habit = await HabitPostgresControllers.getHabitById(id);
        if(habit == null) return res.status(400).send("habit not found");
        res.status(200).json(habit);
    },

    async createHabit(req: Request, res: Response) {
        const {userid, text, date} = req.body;
        const newHabitId = await HabitPostgresControllers.createHabit({userid, text, date});
        if (newHabitId == null) return res.status(500).send("error creating habit")
        res.status(201).json(newHabitId);
    },

    async modifyHabit(req: Request, res: Response) {
        const id: string = req.params.id;
        const {text, date, done}: {text: string, date: string, done: boolean} = req.body;

        // check inputs
        if(text == undefined || date == undefined) return res.status(400).send("invalid inputs");

        // check if habit exists
        const habit = await HabitPostgresControllers.getHabitById(id);
        if(habit == null) return res.status(400).send("no habit with that id");

        const modifiedHabitId = await HabitPostgresControllers.modifyHabit(id, {text, date, done});
        if(modifiedHabitId == null) return res.status(500).send("server error");
        res.status(200).json(modifiedHabitId);
    },

    async deleteHabit(req: Request, res: Response) {
        const habit = await HabitPostgresControllers.getHabitById(req.params.id);
        if (habit == null) return res.status(400).send("habit not found");

        const deletedUserId = await HabitPostgresControllers.deletehabit(req.params.id);
        if(deletedUserId == null) return res.status(500).send("server error");

        res.status(200).json(deletedUserId);
    }
};

export default HabitControllers;