import { Link } from "react-router-dom";
import user from "../assets/img/users/usuario.png";
import logo from "../assets/img/logos/expressionsIA.png";
import useUser from "../hooks/useUser";

export function Navbar(){

    const name = `${localStorage.getItem('name')} ${localStorage.getItem('last_name')}`;
    const email = localStorage.getItem('email');
    const {logout, isLogged} = useUser();

    return (
        <div>        
            <nav className="fixed top-0 z-50 w-full bg-gray-dark border-b border-gray dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button id="sidebarButton" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-white-custon rounded-lg sm:hidden hover:bg-gray focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white-custon dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg id="sidebarSVG" className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path id="sidebarPath" clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="/home" className="flex ml-2 hover:text-blue md:mr-24">
                                <img className="img-user w-8 h-8" src={logo} alt="logo" id="img-logo"/>
                                <span className="ml-2 self-center text-white-custon hover:text-blue text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Expressions.ia</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div >
                                    <button type="button" id="dropdownUserButton" className="bg-gray flex text-sm bg-gray-800 rounded-full">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="img-user w-8 h-8 rounded-full" src={user} alt="user photo" id="img-user"/>
                                    </button>
                                </div>
                                <div className="hidden absolute top-9 right-0 z-50 my-4 text-base list-none bg-gray divide-y divide-gray-light rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-white dark:text-white" role="none">
                                            {name}
                                        </p>
                                        <p className="text-sm font-medium text-white-custon  truncate dark:text-gray-300" role="none">
                                            {email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <Link to="/home" className="block px-4 py-2 text-sm text-white-custon  hover:bg-gray-light dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Detectar</Link>
                                        </li>
                                        <li>
                                            <Link onClick={logout} className="block px-4 py-2 text-sm text-white-custon hover:bg-gray-light dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Cerrar sesión</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}