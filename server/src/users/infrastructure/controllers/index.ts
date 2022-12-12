import {Request, Response} from "express";
import UsersPostgresControllers from "../models/postgres";
import AuthController from "../../../auth/infrastructure/models/users-postgres";

const UserControllers = {
    async getAllUsers(req: Request, res: Response) {
        const listOfUsers = await UsersPostgresControllers.getAllUsers();
        res.status(200).json(listOfUsers);
    },

    async getUserById(req: Request, res: Response) {
        const id: string = req.params.id;

        const user = await UsersPostgresControllers.getUserById(id);
        if(user == null) return res.status(400).send("user not found");
        res.status(200).json(user);
    },

    async modifyUser(req: Request, res: Response) {
        const id: string = req.params.id;
        const {username, email, password} = req.body;

        const isEmailAlreadyOnUse = await AuthController.isEmailAlreadyOnUse(email);

        if(isEmailAlreadyOnUse) return res.status(400).send("email already on use");

        const modifiedUserId = await UsersPostgresControllers.modifyUser(id, {user_id: id, username, email, password});
        if(modifiedUserId == null) return res.status(500).send("server error");
        res.status(200).json(modifiedUserId);
    },

    async deleteUser(req: Request, res: Response) {
        const user = await UsersPostgresControllers.getUserById(req.params.id);
        if (user == null) return res.status(400).send("user not found");

        const deletedUserId = await UsersPostgresControllers.deleteUser(req.params.id);
        if(deletedUserId == null) return res.status(500).send("server error");

        res.status(200).json(deletedUserId);
    }
};

export default UserControllers;