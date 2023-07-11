import { useCallback, useContext, useState } from "react";
import Context from "../context/userContext";
import { createUser, updateUser, loginUser, logoutUser } from "../api/users.api";

export default function useUser() {
    const {token, setToken} = useContext(Context);
    const [state, setState] = useState({
        loading: false,
        error: {
            err: false,
            message: ''
        }, 
    });


    const registerUser = useCallback(async (data) =>{

        setState({loading: true, error:{err: false, message: ''}});
        const res = await createUser(data);
        console.log(res)

        if ( res.status === 200 ||  res.status === 201 ){

            setState({loading: false, error:{err: false, message: ''}});
            return true;

        }else{
            setState({loading: false, error:{err: true, message: res.data}});
            return false
        }

    }, [setToken]);

    const login =  useCallback(async (data) => {

        setState({loading: true, error:{err: false, message: ''}});
        const res = await loginUser(data);

        if ( res.status === 200 ||  res.status === 201 ){

            setState({loading: false, error:{err: false, message: ''}});

            sessionStorage.setItem('token', res.data.token);

            // set user info
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('id', res.data.user.id);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('name', res.data.user.name);
            localStorage.setItem('last_name', res.data.user.last_name);
            localStorage.setItem('organization', res.data.user.organization);

            setToken(res.data.token);

        }else{
            setState({loading: false, error:{err: true, message: res.data.error}});
            sessionStorage.removeItem('token');
        }

    }, [setToken]);

    const logout =  useCallback(async () => {
        const token = localStorage.getItem('token')
        console.log(token)
        const res = await logoutUser(token);
        console.log(res.data)
        if ( res.status === 200 ||  res.status === 201 ){

            sessionStorage.removeItem('token');
            localStorage.clear();
            setToken(null);

        }else{
            console.log(res.response.data.error);
        }
    }, [setToken]);

    return {
        registerUser,
        isLogged: Boolean(token),
        isLoading: state.loading,
        hasError: state.error,
        login,
        logout
    }
}