# Habit maker

This project holds a **fictional app** that let people create their users and manage the activities they want to do (or not do) on any day.

**Basic logic of the app:**
User can add activities to do (or activities they don't want to do, like smoking) and they can set times for that activities. If they realize them, they will win points.

**Lenguajes and more:**
Node (Typescript) / PostgreSQL / React (javascript) 

## Entities: 

User *(data types)*:
* user_id: string
* username: string
* email: string
* password: string

Activities *(data types)*:
- act_id: string 
- name: string
- time: string

## API ENDPOINTS

**/api/user**
* METHOD    URL       FUNCTION         INPUT    OUTPUT
* GET       "/"       getAllUsers   =>          |   Array < User > 
* GET       "/:id"    getUserById   => id       |   User
* PUT       "/:id     modifyUser    => id       |   User ID
* DELETE    "/:id"    deleteUser    => id       |   User ID 

**/api/Habits**
* METHOD    URL                     FUNCTION        INNPUT            OUTPUT
* GET       "/user/:userid/:id"     getUserHabits   userid, id      | Promise<Array<habitEntity> | null>
* GET       "/:id"                  getHabitById    id:             | Habit
* POST      "/"                     createHabit     Habit           | Habit ID
* PUT       "/:id                   modifyHabit     id              | Habit ID
* DELETE    "/:id"                  deleteHabit     id              | Habit ID

**/api/auth**
* METHOD    URL                     FUNCTION        INNPUT            OUTPUT
* POST      "/login"                Login           email, password | Token
* POST      "/register"             Register        User            | userId & Token
