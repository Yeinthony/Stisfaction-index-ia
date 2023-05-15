import { useCallback, useContext, useState } from "react";
import Context from "../context/userContext";
import { createUser, loginUser, logoutUser } from "../api/users.api";

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

            // set user info
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('name', res.data.user.name);
            localStorage.setItem('last_name', res.data.user.last_name);

            setToken(res.data.token);

        }else{
            setState({loading: false, error:{err: true, message: res.data.error}});
        }

    }, [setToken]);

    const logout =  useCallback(async () => {
        const res = await logoutUser(token);
        console.log(res.data)
        if ( res.status === 200 ||  res.status === 201 ){

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