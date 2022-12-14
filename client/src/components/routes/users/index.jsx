import Navbar from "../../navbar/navbar";
import { useEffect, useState } from "react";

function UserContainer() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await fetch("http://localhost:4105/api/users/d5501ff9-15a3-4cf5-9590-b5b10ddffa53")
            .then(data => data.json())
            .then(userData => setUser(userData))
        };

        fetchData();
        console.log(user)
    }, [])


    return (
        <div className="bg-black text-white h-screen w-screen">
            <Navbar className= "h-1/4 w-full"/>
            <div className="w-full h-3/4 flex flex-col justify-center items-center">
                <div class="bg-gray-900 rounded-2xl w-1/2 h-1/2 flex flex-col justify-center items-center">
                    <img class="h-1/4 w-1/6 rounded-full border-stone-50 border overflow-hidden mb-6 mx-auto" src="avatar.jpg" />
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