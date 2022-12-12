import { Pool, QueryResult } from "pg";
import "dotenv/config";
import { v4 as uuid } from "uuid";
import habitEntity from "../../entities/habit.entity";

class HabitPostgresControllers {
    pool: Pool

    constructor(){
        this.pool = new Pool({
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        })
    }

    public async getUserHabits(userid: string): Promise<Array<habitEntity> | null> {
        try {
            await this.pool.connect();
    
            const queryResult: QueryResult = await this.pool.query(`
            SELECT id, userid, text, date, done
            FROM ${process.env.DB_HABITS_TABLE}
            WHERE userid = $1
            `, [userid]);
    
            return queryResult.rows;
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null;
        }
    }

    public async getHabitById(id: string): Promise<habitEntity | null> {
        try {
            await this.pool.connect();

            const queryResult: QueryResult = await this.pool.query(`
            SELECT id, userid, text, date, done
            from ${process.env.DB_HABITS_TABLE}
            WHERE id=$1
            `,[id]);

            return queryResult.rows[0]
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null;
        }
    }

    public async createHabit(habit: {userid:string, text: string, date: string}) {
        try {
            await this.pool.connect();        

            const {text, date, userid} = habit;

            const id = uuid();

            await this.pool.query(`
            INSERT INTO ${process.env.DB_HABITS_TABLE}
            (id, userid, text, date, done)
            VALUES
            ($1, $2, $3, $4, $5)
            `, [id, userid, text, date, false]);

            return id;
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null;
        }
    }

    public async modifyHabit(id: string, habit: {text: string, date: string, done:boolean}): Promise<string | null> {
        try {
            await this.pool.connect();        

            const {text, date, done} = habit;

            await this.pool.query(`
            UPDATE ${process.env.DB_HABITS_TABLE}
            SET text = $1,
                date = $2,
                done = $3
            WHERE id=$4;
            `, [text, date, done, id]);

            return id;
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null;
        }
    }

    public async deletehabit(id: string) {
        try {
            await this.pool.connect();

            await this.pool.query(`
            DELETE FROM ${process.env.DB_HABITS_TABLE}
            WHERE id = $1 
            `, [id]);

            return id;
        } catch (error) {
            if (process.env.NODE_ENV == "development") console.log(error);
            return null;
        }
    }
};

export default new HabitPostgresControllers();