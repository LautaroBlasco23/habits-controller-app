import Navbar from "../../navbar/navbar";
import { useEffect, useState } from "react";

function UserContainer() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const myId = localStorage.getItem("myId")
        const fetchData = async () => {
            await fetch(`http://localhost:4105/api/users/${myId}`)
            .then(data => data.json())
            .then(userData => setUser(userData)) 
        };

        fetchData();
    }, [])


    return (
        <div className="bg-black text-white h-screen w-screen">
            <Navbar className= "h-1/4 w-full"/>
            <div className="w-full h-3/4 flex flex-col justify-center items-center">
                <div class="bg-gray-900 rounded-2xl w-1/2 h-1/2 flex flex-col justify-center items-center">
                    <img class="object-cover h-48 w-48 border-2 rounded-full border-stone-50 overflow-hidden mb-6 mx-auto" src={`http://localhost:4105/api/users/${user.id}/image`} />
                    <div class="text-center">
                        <h2 class="text-lg">{user.username}</h2>
                        <div class="text-purple-500">{user.email}</div>
                        <div class="text-gray-600">erinlindford@example.com</div>
                        <div class="text-gray-600">(555) 765-4321</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserContainer;