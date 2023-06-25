//Dependencies
import { IoStatsChartSharp, IoSettingsSharp, IoScanSharp, IoLogOutOutline } from "react-icons/io5";
import { BsFillCalendarDayFill, BsFillCalendarWeekFill, BsFillCalendarMonthFill, BsFillCalendarFill } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { Link } from "react-router-dom";

//Others
import useUser from "../hooks/useUser";                                                           
import { useEffect, useState } from "react";



export function Sidebar(){

    const [url, setUrl] = useState(null);
    
    //Verifica la url para saber si es necesario desplegar las opciones de estadistica
    useEffect(() => {
        setUrl(location.href);
        if(
            url === "http://localhost:5173/statistics-days" 
            || url === "http://localhost:5173/statistics-week" 
            || url ==="http://localhost:5173/statistics-month"
            || url === "http://localhost:5173/statistics-year"
        ){
        const $statisticsOptions = document.getElementById('dropdown-statistics');
        $statisticsOptions.classList.remove('hidden');
    }
    }, [url]);

    
    const {logout, isLogged} = useUser();
    const dropdownStatistics = () =>{
        const $statisticsOptions = document.getElementById('dropdown-statistics');
        $statisticsOptions.classList.toggle('hidden');
    }

    const dropdownReports = () =>{
        const $reportsOptions = document.getElementById('dropdown-reports');
        $reportsOptions.classList.toggle('hidden');
    }

    const dropdownReportsDay = () =>{
        const $reportsDayOptions = document.getElementById('dropdown-reports-day');
        $reportsDayOptions.classList.toggle('hidden');
    }

    const dropdownReportsWeek = () =>{
        const $reportsWeekOptions = document.getElementById('dropdown-reports-week');
        $reportsWeekOptions.classList.toggle('hidden');
    }

    const dropdownReportsMonth = () =>{
        const $reportsMonthOptions = document.getElementById('dropdown-reports-month');
        $reportsMonthOptions.classList.toggle('hidden');
    }

    const dropdownReportsYear = () =>{
        const $reportsYearOptions = document.getElementById('dropdown-reports-year');
        $reportsYearOptions.classList.toggle('hidden');
    }

    return (
        <div>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-dark border-r border-gray sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">                                                                                      
                <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="/home" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">                                                                                                                             
                                <IoScanSharp className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ml-3">Detectar</span>
                            </Link>
                        </li>
                        <li> 
                            <button type="button" onClick={dropdownStatistics} className="flex items-center w-full p-2 text-white-custon transition duration-75 rounded-lg group hover:bg-gray dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example">
                                <IoStatsChartSharp className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400  dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 text-left whitespace-nowrap">Estadisticas</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                            <ul id="dropdown-statistics" className="hidden ml-8 py-2 space-y-2">
                                <li>
                                    <Link to="/statistics-days" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                        <BsFillCalendarDayFill className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Por dia</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/statistics-week" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                        <BsFillCalendarWeekFill className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Por semana</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/statistics-month" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                        <BsFillCalendarMonthFill className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Por mes</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/statistics-year" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                        <BsFillCalendarFill className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Por año</span>
                                    </Link>
                                </li>
                            </ul>                                                   
                        </li>
                        <li> 
                            <button type="button" onClick={dropdownReports} className="flex items-center w-full p-2 text-white-custon transition duration-75 rounded-lg group hover:bg-gray dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example">
                                <BsFiletypePdf className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400  dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 text-left whitespace-nowrap">Reportes</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                            <ul id="dropdown-reports" className="hidden ml-4 py-2 space-y-2">
                                <li>
                                    <button type="button" onClick={dropdownReportsDay} className="flex items-center w-full p-2 text-white-custon transition duration-75 rounded-lg group hover:bg-gray dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example">
                                        <BsFillCalendarDayFill className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400  dark:group-hover:text-white" />
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Por dia</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <ul id="dropdown-reports-day" className="hidden ml-8 py-2 space-y-2">
                                        <li>
                                            <Link to="/reports-days" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                                <span className="flex-1 ml-3 whitespace-nowrap">Ver web</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/reports-days-showPDF" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                                <span className="flex-1 ml-3 whitespace-nowrap">Ver PDF</span>
                                            </Link>
                                        </li>
                                    </ul>       
                                </li>
                                <li>
                                    <button type="button" onClick={dropdownReportsWeek} className="flex items-center w-full p-2 text-white-custon transition duration-75 rounded-lg group hover:bg-gray dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example">
                                        <BsFillCalendarWeekFill className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400  dark:group-hover:text-white" />
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Por semana</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <ul id="dropdown-reports-week" className="hidden ml-8 py-2 space-y-2">
                                        <li>
                                            <Link to="/reports-week" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                                <span className="flex-1 ml-3 whitespace-nowrap">Ver web</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/reports-week-showPDF" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                                <span className="flex-1 ml-3 whitespace-nowrap">Ver PDF</span>
                                            </Link>
                                        </li>
                                    </ul>       
                                </li>
                                <li>
                                    <button type="button" onClick={dropdownReportsMonth} className="flex items-center w-full p-2 text-white-custon transition duration-75 rounded-lg group hover:bg-gray dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example">
                                        <BsFillCalendarMonthFill className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400  dark:group-hover:text-white" />
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Por mes</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <ul id="dropdown-reports-month" className="hidden ml-8 py-2 space-y-2">
                                        <li>
                                            <Link to="/reports-month" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                                <span className="flex-1 ml-3 whitespace-nowrap">Ver web</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/reports-month-showPDF" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                                <span className="flex-1 ml-3 whitespace-nowrap">Ver PDF</span>
                                            </Link>
                                        </li>
                                    </ul>       
                                </li>
                                <li>
                                    <button type="button" onClick={dropdownReportsYear} className="flex items-center w-full p-2 text-white-custon transition duration-75 rounded-lg group hover:bg-gray dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example">
                                        <BsFillCalendarFill className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400  dark:group-hover:text-white" />
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Por año</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <ul id="dropdown-reports-year" className="hidden ml-8 py-2 space-y-2">
                                        <li>
                                            <Link to="/reports-year" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                                <span className="flex-1 ml-3 whitespace-nowrap">Ver web</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/reports-year-showPDF" className="flex items-center p-2 text-white-custon rounded-lg dark:text-white hover:bg-gray dark:hover:bg-gray-700">
                                                <span className="flex-1 ml-3 whitespace-nowrap">Ver PDF</span>
                                            </Link>
                                        </li>
                                    </ul>       
                                </li>
                            </ul>                                                   
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
