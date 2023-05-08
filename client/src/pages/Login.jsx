import { Link } from "react-router-dom";
import { SecondaryNavbar } from "../components/SecondaryNavbar";
import { ButtonForm } from "../components/buttons/ButtonForm";
import { Input } from "../components/inputs/Input";
import { getAllUsers } from "../api/users.api";
import { useEffect } from "react";


export function Login(){

    useEffect(()=>{
        async function loadUsers(){
            const res = await getAllUsers();
            console.log(res);
        }
        loadUsers(); 
    }, [])

    return (
        <div className="bg-gray-dark h-screen">
            <SecondaryNavbar/>
            <div className="w-2/5 mx-auto mt-12 mb-24 p-6 bg-gray border border-gray-light2 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h1 className="mb-4 text-center text-2xl font-extrabold text-white-custon dark:text-white md:text-3xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-light from-blue">Login</span></h1>
                <form>
                    <div className="mb-6">
                        <Input type={"email"} placeholder={"john.doe@company.com"} name={"email"} nameLabel={"Email"} />
                    </div> 
                    <div className="mb-6">
                        <Input type={"password"} placeholder={"•••••••••"} name={"password"} nameLabel={"Contraseña"} />
                    </div> 
                    <p className="block mb-2 font-medium text-sm text-white-custon dark:text-white">¿No tienes cuenta? <Link to="/register" className="font-semibold hover:text-blue-dark">Crea una</Link></p>
                    <ButtonForm name={"Entrar"} />
                </form>
            </div>
       </div>
    );
}

