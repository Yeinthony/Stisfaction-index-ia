import { useEffect, useState } from "react";

//Dependencies
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//Components
import { SecondaryNavbar } from "../components/SecondaryNavbar";
import { ButtonForm } from "../components/buttons/ButtonForm";
import { Input } from "../components/inputs/Input";
import { SpanInput } from "../components/inputs/SpanInput";

//Others
import { getAllUsers, createUser } from "../api/users.api";

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

    const [users, setUsers] = useState([]);

    //Get registered users
    useEffect(()=>{
        async function loadUsers(){
            const res = await getAllUsers();
            setUsers(res.data)
            console.log(users);
        }
        loadUsers(); 
    }, []);


    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(userSchema)
    });

    const onSubmit = handleSubmit(async data => {
        //Check that the passwords match
        if (data.password === data.confirm_password) {
            delete data.confirm_password;
            const res = await createUser(data);
            console.log(res);
            
        }else{
            console.log("las contraseñas no coinciden");
        }
          
        
    })

    return (
       <div className="bg-gray-dark h-auto">
            <SecondaryNavbar/>
            <div className="w-8/12 mx-auto mt-12 mb-24 p-6 bg-gray border border-gray-light2 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h1 className="mb-12 text-center text-2xl font-extrabold text-white-custon dark:text-white md:text-3xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-light from-blue">Registrase</span></h1>
                <form onSubmit={onSubmit}>
                    <div className="grid mb-6 gap-6 md:grid-cols-2">
                        <div>
                            <Input type={"text"} placeholder={"John"} name={"name"} nameLabel={"Nombre"} register={register("name") } />
                            {<span>{errors.name?.message}</span>} 
                        </div>
                        <div>
                            <Input type={"text"} placeholder={"Wick"} name={"last_name"} nameLabel={"Apellido"} register={register("last_name") } />
                            {<span>{errors.last_name?.message}</span>} 
                        </div> 
                    </div>
                    <div className="mb-6">
                        <SpanInput type={"text"} placeholder={"Hombre del saco"} name={"username"} nameLabel={"Username"} spanIcon={"@"} register={register("username")} />
                        {<span>{errors.username?.message}</span>} 
                    </div>
                    <div className="mb-6">
                        <Input type={"email"} placeholder={"john.doe@company.com"} name={"email"} nameLabel={"Email"}  register={register("email")} />
                        {<span>{errors.email?.message}</span>} 
                    </div> 
                    <div className="mb-6">
                        <Input type={"password"} placeholder={"•••••••••"} name={"password"} nameLabel={"Contraseña"} register={register("password")} />
                        {<span>{errors.password?.message}</span>} 
                    </div> 
                    <div className="mb-6">
                        <Input type={"password"} placeholder={"•••••••••"} name={"confirm_password"} nameLabel={"Confirmar contraseña"} register={register("confirm_password")} />
                        {<span>{errors.confirm_password?.message}</span>}  
                    </div> 
                    <ButtonForm name={"Registrar"} />
                </form>
            </div>
       </div>
    );
}

