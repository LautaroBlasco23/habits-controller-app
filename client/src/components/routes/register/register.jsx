import { Link } from "react-router-dom";
import Navbar from "../../navbar/navbar";
import axios from "axios";

function Register(){
    async function handleSubmit(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        
        try {
            const request = await axios.post("http://localhost:4105/api/auth/register", {
                "username": username,
                "email": email,
                "password": password
            })

            localStorage.setItem("myId", request.data.newUserId)
            
            console.log(request);
        } catch (error) {
            document.getElementById("username").classList.add("border-red-700", "duration-300");
            document.getElementById("email").classList.add("border-red-700", "duration-500");
            document.getElementById("password").classList.add("border-red-700", "duration-700");
            console.log(error)
        }
    }
    
    return(
        <div className="bg-black text-white h-screen w-screen">
            <Navbar />
            <div className=" flex flex-col justify-center items-center h-auto w-auto mt-24">
                <div className="w-full max-w-xl">
                    <form className="bg-white shadow-md p-12 border-4 rounded-lg border-blue-700" onSubmit={handleSubmit}>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                        </div>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
                        </div>
                        <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                        </div>
                        <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Register
                        </button>
                        <Link to="/auth/login" className="text-blue-500">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default Register;