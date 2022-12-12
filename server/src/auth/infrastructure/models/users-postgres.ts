import { Pool, QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import 'dotenv/config';
import UserEntity from '../../../users/entities/user.entity';

class AuthDatabaseController {
    pool: Pool;

    constructor(){
        this.pool = new Pool({
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        })
    }

    public async getUserByEmail(email: string) :Promise<UserEntity | null> {
        try {
            await this.pool.connect();
            
            const queryResult: QueryResult = await this.pool.query(`
            SELECT * 
            FROM ${process.env.DB_USERS_TABLE}
            WHERE email=$1
            `, [email]);
            
            if (queryResult.rows.length == 0) throw Error('not user with that email');
            return queryResult.rows[0];
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null
        }
    }


    public async isEmailAlreadyOnUse(email: string): Promise<boolean | null> {
        try {
            await this.pool.connect();
            const queryResult: QueryResult = await this.pool.query(`
            SELECT id 
            FROM ${process.env.DB_USERS_TABLE}
            WHERE email=$1
            `,[email]);
            if (queryResult.rows.length == 0) return false;
            return true;
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null    
        }

    }

    public async createNewUser(user: any): Promise<string | null> {
        try {
            await this.pool.connect();
    
            const {email, username, password} = user;
    
            const id = uuid();
            const encryptedPassword: string = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
    
            await this.pool.query(`
            INSERT INTO ${process.env.DB_USERS_TABLE}
            (id, email, username, password)
            VALUES
            ($1, $2, $3, $4)
            `,
            [id, email, username, encryptedPassword]);
    
            return id;
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null
        }
    }

    public async getEncryptedPassword(email: string): Promise<string | null> {
        try {
            await this.pool.connect();

            const queryResult: QueryResult = await this.pool.query(`
            SELECT password 
            FROM ${process.env.DB_USERS_TABLE}
            WHERE email = $1
            `, [email]);

            return queryResult.rows[0].password;
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error); 
            return null
        }
    }
}

export default new AuthDatabaseController();