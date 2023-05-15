import { useContext, useEffect } from "react";

//Dependencies
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";


//Components
import { SecondaryNavbar } from "../components/SecondaryNavbar";
import { ButtonForm } from "../components/buttons/ButtonForm";
import { Input } from "../components/inputs/Input";
import { SpanInput } from "../components/inputs/SpanInput";
import { Spinner } from "../components/Spinner";

//Others
import useUser from "../hooks/useUser";


// Validate form
const loginSchema = yup.object({
    username: yup.string().required("Este campo es requerido"),
    password: yup.string().required("Este campo es requerido")
}).required();


export function Login(){

    const {isLoading, hasError, login, isLogged} = useUser();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(loginSchema)
    });

    useEffect(()=>{
        if(isLogged) navigate('/home')
    }, [isLogged, navigate]);

    const onSubmit = handleSubmit(async data => {
        login(data);
    })

    return (
        <div className="bg-gray-dark h-screen border-2 border-gray-dark">
            {isLoading ?
                <Spinner/>:
                <>
                    <SecondaryNavbar/>
                    <div className="w-2/5 mx-auto my-20 p-6 bg-gray border border-gray-light2 rounded-xl shadow-md  dark:bg-gray-800 dark:border-gray-700">
                        <h1 className="mb-4 text-center text-2xl font-extrabold text-white-custon dark:text-white md:text-3xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-light from-blue">Login</span></h1>
                        <form onSubmit={onSubmit}>
                            <SpanInput type={"text"} placeholder={"Hombre del saco"} name={"username"} nameLabel={"Username"} spanIcon={"@"} register={register("username")} errors={errors} />                              
                            
                            <Input type={"password"} placeholder={"•••••••••"} name={"password"} nameLabel={"Contraseña"} register={register("password")} errors={errors.password} />

                            {hasError.err? 
                                <div className="mb-6">
                                    <span className="text-red-500">{hasError.message}</span>
                                </div>: ""}
                            <p className="block mb-2 font-medium text-sm text-white-custon dark:text-white">¿No tienes cuenta? <Link to="/register" className="font-semibold hover:text-blue-light">Crea una</Link></p>
                            <ButtonForm name={"Entrar"} />
                        </form>
                    </div>
                </>
            }
           
       </div>
    );
}

