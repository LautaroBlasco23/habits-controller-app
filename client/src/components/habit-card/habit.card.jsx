import axios from "axios";
import { useState } from "react";

function HabitCard({habit}) {
    const [update, setUpdate] = useState(false)

    async function changeDone() {
        habit.done = !habit.done;
        await axios.put(`http://localhost:4105/api/habits/${habit.id}`, habit);
        setUpdate(!update)
        console.log(update)
    }

    return (
        <div className= {`rounded w-full h-24 border-gray-500 mt-6 border hover:border-white ${habit.done ? "bg-green-900 hover:bg-green-700" : "bg-neutral-900 hover:bg-neutral-700"}`} onDoubleClick={changeDone}>
            <h1 className="text-2xl">{habit.text}</h1>
            <p>{habit.date}</p>
            <span>{String(habit.done)}</span>
        </div>
    )
}

export default HabitCard;