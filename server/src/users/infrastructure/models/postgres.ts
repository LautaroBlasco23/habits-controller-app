import { Pool, QueryResult } from "pg";
import UserEntity from "../../entities/user.entity";
import "dotenv/config";

class UsersPostgresControllers {
    pool: Pool

    constructor(){
        this.pool = new Pool({
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        })
    }

    public async getAllUsers(): Promise<Array<UserEntity> | null> {
        try {
            await this.pool.connect();
    
            const queryResult: QueryResult = await this.pool.query(`
            SELECT id, email, username
            FROM ${process.env.DB_USERS_TABLE}
            `);
    
            return queryResult.rows;
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null;
        }
    }

    public async getUserById(id: string): Promise<UserEntity | null> {
        try {
            await this.pool.connect();

            const queryResult: QueryResult = await this.pool.query(`
            SELECT id, email, username
            from ${process.env.DB_USERS_TABLE}
            WHERE id=$1
            `,[id]);

            return queryResult.rows[0]
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null;
        }
    }

    public async modifyUser(id: string, user: UserEntity): Promise<string | null> {
        try {
            await this.pool.connect();        

            const {username, email, password} = user;

            await this.pool.query(`
            UPDATE ${process.env.DB_USERS_TABLE}
            SET username = $1,
                email = $2,
                password = $3
            WHERE id=$4;
            `, [username, email, password, id]);

            return id;
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null;
        }
    }

    public async deleteUser(id: string) {
        try {
            await this.pool.connect();

            await this.pool.query(`
            DELETE FROM ${process.env.DB_USERS_TABLE}
            WHERE id = $1 
            `, [id]);

            return id;
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null;
        }
    }
}

export default new UsersPostgresControllers();