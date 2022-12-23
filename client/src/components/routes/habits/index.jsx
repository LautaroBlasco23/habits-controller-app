import Navbar from "../../navbar/navbar";
import HabitCard from "../../habit-card/habit.card";
import { useState, useEffect } from "react";

function HabitContainer() {
    const [habits, setHabits] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        const fetchData = async () => {
            fetch("http://localhost:4105/api/habits/user/233c98d2-c962-46fd-91c5-520688873748")
            .then((response) => response.json())
            .then((listOfHabits) => setHabits(listOfHabits))
          }
        
            // call the function
            fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    return (
        <div className="bg-black text-white h-screen w-screen ">
            <Navbar />
            <div className="flex flex-col ">
                {habits.map(habit => {
                    console.log(habit);
                    return <HabitCard key={habit.id} habit={habit}/>
                })}  
            </div>
                  
        </div>
    );
};

export default HabitContainer;