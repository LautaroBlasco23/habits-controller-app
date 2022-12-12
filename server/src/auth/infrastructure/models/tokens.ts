import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import Auth from "../../entities/auth.entity";

const tokenControllers = {
    generateToken: (payload: {id: string, username: string}): Auth => {
        const newToken: string = jwt.sign(payload, process.env.JWT_SECRET!);
        return {token: newToken};
    },

    isTokenValid: (token: string): string | JwtPayload => {
        const isValid: string | JwtPayload = jwt.verify(token, process.env.JWT_SECRET!);
        return isValid;
    },
};

export default tokenControllers;