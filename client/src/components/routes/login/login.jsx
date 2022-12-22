import { Link } from "react-router-dom";
import Navbar from "../../navbar/navbar";
import axios from "axios";

function Login(){
    async function handleSubmit(e) {
        console.log("hola")
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const token = await axios.post("http://localhost:4105/api/auth/login", {
            "username": "lautaro",
            "email": "lautaro_1@gmail",
            "password": "asdjasdj"
        })
        console.log("adios")
        console.log(token)
    }
    
    return(
        <div className="bg-black text-white h-screen w-screen">
            <Navbar />
            <div className=" flex flex-col justify-center items-center h-auto w-auto mt-24">
                <div class="w-full max-w-xl">
                    <form class="bg-white shadow-md rounded p-12 mb-4" onSubmit={handleSubmit}>
                        <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
                        </div>
                        <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                        </div>
                        <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                        <Link to="/auth/register" className="text-blue-500">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default Login;