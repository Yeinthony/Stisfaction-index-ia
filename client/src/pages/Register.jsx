import { useState } from "react";

//Dependencies
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";


//Components
import { SecondaryNavbar } from "../components/SecondaryNavbar";
import { ButtonForm } from "../components/buttons/ButtonForm";
import { Input } from "../components/inputs/Input";
import { SpanInput } from "../components/inputs/SpanInput";
import { Toast } from "../components/Toast";

//Others
import useUser from "../hooks/useUser";
import { Spinner } from "../components/Spinner";


// Validate form
const userSchema = yup.object({
    name: yup.string().required("Este campo es requerido"),
    last_name: yup.string().required("Este campo es requerido"),
    username: yup.string().required("Este campo es requerido"),// Falta verificar que el nombre de usuario no este registrado
    email: yup.string().email("Ingrese un email valido").required("Este campo es requerido"),// Falta verificar que el email no este registrado y enviar codigo de confirmacion para activar la cuenta
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,15}$/, "La contraseña debe tener entre 6 y 15 caracteres, al menos una letra minuscula, al menos una letra mayuscula, al menos un digito y al menos un caracter especial.").required("Este campo es requerido"),//Falta verificar que las contraseñas coincidan
    confirm_password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,15}$/, "La contraseña debe tener entre 6 y 15 caracteres, al menos una letra minuscula, al menos una letra mayuscula, al menos un digito y al menos un caracter especial.").required("Este campo es requerido")//Falta verificar que las contraseñas coincidan

}).required();

export function Register() {

    const [matchPassword, setMatchPassword] = useState(false);
    const [registred, setRegistred] = useState(false);
    const navigate = useNavigate();

    const {registerUser, isLoading, hasError} = useUser();

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(userSchema)
    });

    const onSubmit = handleSubmit(async data => {
        //Check that the passwords match
        if (data.password === data.confirm_password) {
            delete data.confirm_password;
            const res = await registerUser(data);
            setMatchPassword(false);

            if(res) {
                setRegistred(true);
                setTimeout(() => {
                    navigate("/login");
                }, 9000);
            }

        }else{
            setMatchPassword(true)
        }       
        
    })

    return (
       <div className="bg-gray-dark border-2 border-gray-dark">
            {isLoading ?
                <Spinner/>:
                <>
                    {registred ? <Toast/>: ""}
                    <SecondaryNavbar/>
                    <div className="w-8/12 mx-auto mt-32 mb-24 p-6 bg-gray border border-gray-light2 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <h1 className="mb-12 text-center text-2xl font-extrabold text-white-custon dark:text-white md:text-3xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-light from-blue">Registrase</span></h1>
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-6 md:grid-cols-2">
                                <Input type={"text"} placeholder={"John"} name={"name"} nameLabel={"Nombre"} register={register("name") } errors={errors.name} />

                                <Input type={"text"} placeholder={"Wick"} name={"last_name"} nameLabel={"Apellido"} register={register("last_name") } errors={errors.last_name}/>
                            </div>

                            <SpanInput type={"text"} placeholder={"Hombre del saco"} name={"username"} nameLabel={"Username"} spanIcon={"@"} register={register("username")} errors={errors}/>
                            {hasError.err? 
                                <div className="mb-6">
                                    <span className="text-red-500">{hasError.message.username[0]}</span>
                                </div>: ""}

                            <Input type={"email"} placeholder={"john.doe@company.com"} name={"email"} nameLabel={"Email"}  register={register("email")} errors={errors.email}/>
                            {hasError.err? 
                                <div className="mb-6">
                                    <span className="text-red-500">{hasError.message.email[0]}</span>
                                </div>: ""}

                            <Input type={"password"} placeholder={"•••••••••"} name={"password"} nameLabel={"Contraseña"} register={register("password")} errors={errors.password}/>

                            <Input type={"password"} placeholder={"•••••••••"} name={"confirm_password"} nameLabel={"Confirmar contraseña"} register={register("confirm_password")} errors={errors.confirm_password}/>
                            {matchPassword? 
                                <div className="mb-6">
                                    <span className="text-red-500">Las contraseñas no coinciden</span>
                                </div>: ""}

                            <ButtonForm name={"Registrar"} />
                        </form>
                    </div>
                </>
            }
       </div>
    );
}

