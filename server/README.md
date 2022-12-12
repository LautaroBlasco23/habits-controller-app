# Habit maker

This project holds a **fictional app** that let people create their users and manage the activities they want to do (or not do) on any day.

**Basic logic of the app:**
User can add activities to do (or activities they don't want to do, like smoking) and they can set times for that activities. If they realize them, they will win points.

**Lenguajes and more:**
Node (Typescript) / PostgreSQL / React (javascript) 

## Entities: 

User:
* user_id: string (generated with uuid)
* username: string
* email: string | unique
* password: string (encoded using bcrypt)

Activities:
- act_id: string (generated with uuid)
- name: string
- time: string (date like)
