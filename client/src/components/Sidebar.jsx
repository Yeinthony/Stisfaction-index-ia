//Dependencies
import { IoStatsChartSharp, IoSettingsSharp, IoScanSharp, IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

//Others
import useUser from "../hooks/useUser";

export function Sidebar(){

    const {logout, isLogged} = useUser();

    return (
        <div>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-dark border-r border-gray sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                <IoScanSharp className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ml-3">Detectar</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                <IoStatsChartSharp className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Estadisticas</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                <IoSettingsSharp className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">opciones</span>
                            </a>
                        </li>
                        <li className="botton-0">
                            <Link onClick={logout} className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                <IoLogOutOutline className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Salir</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
