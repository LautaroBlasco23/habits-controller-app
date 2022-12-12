import {Request, Response} from "express";
import tokenControllers from "../models/tokens";
import AuthDatabaseController from '../models/users-postgres';
import checkRegisterInputs from '../utils/register-form-checker';
import bcrypt from 'bcrypt';

class AuthController {
    
    public async Register(req: Request, res: Response) {
        
        const {username, email, password} = req.body;
        const inputError = checkRegisterInputs(username, email, password);
        if (inputError != null) return res.status(400).send(inputError);

        if(await AuthDatabaseController.isEmailAlreadyOnUse(email)) return res.status(400).send("Email already on use");

        const newUserId = await AuthDatabaseController.createNewUser({username, email, password});
        if (newUserId == null) return res.status(500).send("error creating user");
        
        const userToken = tokenControllers.generateToken({id: newUserId, username})

        res.status(201).json({newUserId, userToken});
    }

    public async Login(req: Request, res: Response) {

        const {email, password} = req.body;
        
        if(AuthDatabaseController.getUserByEmail(email) == null) return res.status(400).send("not user with that email");
        
        const encryptedPassword = await AuthDatabaseController.getEncryptedPassword(email);
        if (encryptedPassword == null) return res.status(500).send("Server error");

        if(!(await bcrypt.compare(password, encryptedPassword))) return res.status(400).send("invalid credentials")
     
        const userData = await AuthDatabaseController.getUserByEmail(email);
        if (userData == null) return res.status(500).send("Server error");

        const {user_id, username} = userData;

        const userToken = tokenControllers.generateToken({id: user_id, username});

        res.status(200).json(userToken);
    }
}

export default new AuthController();