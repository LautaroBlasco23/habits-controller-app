# HABIT CONTROLLER
Fictitional application developed to take controll of your day to day activities. You can write the activities you want to do, and the activities you DON'T want to do. Yo will points for doing the right activities every day.

# APPLICATION SETUP
You have to create a *.env* file and put the following variables: 
- PORT
- DB_HABITS_TABLE
- DB_NAME
- DB_USER
- DB_PASSWORD

**On server/**
```
npm run build
npm run start
```
**On client/**
```
npm run install
npm run start
```

## SERVER

**Basic logic of the api:**
You Can do any CRUD request to the api endpoints (detailed below)

**Lenguajes and more: (PERN)**
- PostgreSQL 
- Express (Javascript Framework)
- React (javascript)
- Node (Typescript)

**Libraries:**
- dotenv
- bcrypt
- jsonwebtoken
- uuid
- multer
- pg
- cors
- jest

## Entities: 

User *(data types)*:
- user_id: string
- username: string
- email: string
- password: string

Activities *(data types)*:
- act_id: string 
- name: string
- time: string

## API ENDPOINTS

**/api/user**

METHOD | URL | FUNCTION | INPUT | OUTPUT
--- | --- | --- | --- | ---
GET | "/" | getAllUsers | - | Array< User >
GET | "/:id" | getUserById | id | User
PUT | "/:id" | modifyUser | id | User ID
DELETE | "/:id" | deleteUser | id | User ID


**/api/Habits**
METHOD | URL | FUNCTION | INPUT | OUTPUT
--- | --- | --- | --- | ---
GET | "/user/:userid/:id" | getUserHabits | userid, id | Array< Habit >
GET | "/:id" | getHabitById | id | Habit
POST | "/" | createHabit | Habit | Habit ID
PUT | "/:id" | modifyHabit | id | Habit ID
DELETE | "/:id" | deleteHabit | id | Habit ID


**/api/auth**
METHOD | URL | FUNCTION | INPUT | OUTPUT
--- | --- | --- | --- | ---
POST | "/login" | Login | email, password | Token
POST | "/register" | Register | User | User ID, Token