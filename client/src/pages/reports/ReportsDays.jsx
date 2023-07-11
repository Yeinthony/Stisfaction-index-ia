import { useEffect, useState } from "react";

//Components 
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar"; 

//Others
import { Unfold } from "../../helpers/Unfold"; 
import { getExpressionsForDay } from "../../api/expressions.api";
import { getGendersForDay } from "../../api/genders.api";
import { getAgesForDay } from "../../api/ages.api";
import { averagePorcentageExpressions, averagePorcentageGenders, averagePorcentageAges } from "../../helpers/AveragePorcentange";
import logo from "../../assets/img/logos/expressionsIA2.png";


export function ReportsDays() {

    const [expressions, setExpressions] = useState({});
    const [genders, setGenders] = useState({});
    const [ages, setAges] = useState({});

    const name = `${localStorage.getItem('name')} ${localStorage.getItem('last_name')}`;
    const organization = localStorage.getItem('organization');
    const today = new Date();
    const token = sessionStorage.getItem('token');
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();


    useEffect(() => {

        const expressionsToday = async() =>{
            const res = await getExpressionsForDay(token, day, month, year);
            setExpressions(averagePorcentageExpressions(res.data));
        }

        const gendersToday = async() =>{
            const res = await getGendersForDay(token, day, month, year);
            setGenders(averagePorcentageGenders(res.data));
        }

        const agesToday = async() =>{
            const res = await getAgesForDay(token, day, month, year);
            setAges(averagePorcentageAges(res.data));
        }

        expressionsToday();
        gendersToday();
        agesToday();

    }, []);
    
    return (
        <div onClick={Unfold}>
            <Navbar/>
            <Sidebar/>
            <div className="p-4 sm:ml-64 bg-white-custon">
                <div className="mt-24 lg:mx-12 sm:mx-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="block px-4 text-md leading-none tracking-wider text-gray-dark md:text-1xl lg:text-2xl dark:text-white">EXPRESIONS.IA</span>
                            <span className="px-4 text-3xl font-extrabold tracking-wider leading-none tracking-tight text-gray-dark md:text-5xl lg:text-6xl dark:text-white">REPORTE DIARIO</span>
                        </div>
                        <img className="img-user w-32 h-32" src={logo} alt="user photo" id="img-user"/>
                    </div>
                    <div className="lg:flex block lg:justify-between px-4 mt-16">
                        <div className='relative px-3 pt-2 pb-5 lg:w-2/4 md:2/3 bg-white-custon-dark border border-gray-200 rounded-sm'>
                            <span className="px-2 text-md leading-none tracking-wide text-gray-dark md:text-lg lg:text-2xl dark:text-white">NOMBRE:</span>
                            <span className="pl-4 text-md leading-none tracking-wide uppercase text-gray-dark md:text-lg lg:text-2xl dark:text-white">{name}</span>
                        </div>
                        <div className='w-auto relative px-3 pt-2 pb-5 w-2/6 bg-white-custon-dark border border-gray-200 rounded-sm mt-8 lg:mt-0'>
                            <span className="px-2 text-md leading-none tracking-wide text-gray-dark md:text-lg lg:text-2xl dark:text-white">FECHA:</span>
                            <span className="pl-4 text-md leading-none tracking-wide uppercase text-gray-dark md:text-lg lg:text-2xl dark:text-white">{`${today.getDate()}/${[today.getMonth()+1]}/${today.getFullYear()}`}</span>
                        </div>
                    </div>

                    <div className='relative px-3 mx-4 mt-8 pt-2 pb-5 lg:w-2/4 md:2/3 bg-white-custon-dark border border-gray-200 rounded-sm'>
                        <span className="px-2 text-md leading-none tracking-wide text-gray-dark md:text-lg lg:text-2xl dark:text-white">ORGANIZACIÓN:</span>
                        <span className="pl-4 text-md leading-none tracking-wide uppercase text-gray-dark md:text-lg lg:text-2xl dark:text-white">{organization}</span>
                    </div>

                    <div className="px-4 mt-36">
                        <div className="flex justify-center">
                            <span className="px-4 text-2xl font-bold tracking-wider leading-none tracking-tight text-gray-dark md:text-3xl lg:text-4xl dark:text-white">DETALLES DE LAS DETECCIONES</span>
                        </div>

                        <div className="lg:flex lg:justify-between lg:mr-0 mt-12 md:block mr-24">
                            <div className="w-4/12 lg:mr-10 mr-36 mx-auto relative border border-gray-200 rounded-md">
                                <table className="bg-blue-dark text-lg text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-lg text-gray-900 uppercase dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Expresión
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Porcentaje
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Enojo
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {expressions.angry} %
                                            </td>
                                        </tr>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Disgusto
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {expressions.disgust} %
                                            </td>
                                        </tr>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Miedo
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {expressions.fear} %
                                            </td>
                                        </tr>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Felicidad
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {expressions.happy} %
                                            </td>
                                        </tr>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Neutral
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {expressions.neutral} %
                                            </td>
                                        </tr>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Tristeza
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {expressions.sad} %
                                            </td>
                                        </tr>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Sorpresa
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {expressions.surprise} %
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-4/12 relative mx-auto mt-4 lg:mt-0 lg:mr-0 mr-28 border border-gray-200 rounded-md">
                                <table className="bg-blue-dark text-lg text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-lg text-gray-900 uppercase dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Edad
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Porcentaje
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                6-11
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {ages.six_to_eleven} %
                                            </td>
                                        </tr>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                12-18
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {ages.twelve_to_eighteen} %
                                            </td>
                                        </tr>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                19-26
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {ages.nineteen_to_twentysix} %
                                            </td>
                                        </tr>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                27-59
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {ages.twentyseveven_to_fiftynine} %
                                            </td>
                                        </tr>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                60-80
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {ages.sixty_to_eighty} %
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-4/12 relative mx-auto mt-4 lg:mt-0 lg:mr-0 mr-32 border border-gray-200 rounded-md">
                                <table className="bg-blue-dark text-lg text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-lg text-gray-900 uppercase dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Genero
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Porcentaje
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Masculino
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {genders.male} %
                                            </td>
                                        </tr>
                                        <tr className="bg-white-custon-dark dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Femenino
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {genders.female} %
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                    
            </div>
        </div>
    )
}