import { useEffect, useState } from "react";

//Dependencies
import { DateTime } from 'luxon';

//Components
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar"; 
import { TablesDetections } from "../../components/TableDetections";

//Others
import { Unfold } from "../../helpers/Unfold"; 
import { getDaysMonths } from "../../helpers/GetDaysMonths";
import { getExpressionsForMonth } from '../../api/expressions.api';
import { getGendersForMonth } from '../../api/genders.api';
import { getAgesForMonth } from '../../api/ages.api';
import { averagePorcentageExpressions, averagePorcentageGenders, averagePorcentageAges } from "../../helpers/AveragePorcentange";
import logo from "../../assets/img/logos/expressionsIA2.png";


export function ReportsMonth() {

    const [expressions, setExpressions] = useState(false);
    const [genders, setGenders] = useState(false);
    const [ages, setAges] = useState(false);

    const name = `${localStorage.getItem('name')} ${localStorage.getItem('last_name')}`;
    const organization = localStorage.getItem('organization');
    const today = new Date();
    const token = sessionStorage.getItem('token');
    const res = getDaysMonths();
    const month = today.getMonth();
    const year = today.getFullYear();
    
    const daysInTheMonth = [];

    const daysMonth = DateTime.local(today.getFullYear(), today.getMonth()).daysInMonth;

    for (let i = 1; i < daysMonth; i++) { daysInTheMonth.push(i) }

    useEffect(() => {

        const expressionsMonth = async() =>{
            const record = await getExpressionsForMonth(token, month+1, year);

            const expressionsOfTheMonth = [];

            //Load genderOfTheMonth with the days of the month
            for (let i = 1; i < daysMonth; i++) { 
                expressionsOfTheMonth.push([]);
                //Load gendersOfTheMonth with the records
                record.data.forEach(el => {
                    if(i === el.day) expressionsOfTheMonth[i-1].push(el) 
                });
            }

            let count = 0;
            expressionsOfTheMonth.forEach(el => {
                expressionsOfTheMonth[count] = averagePorcentageExpressions(el);
                count += 1;
            });

            setExpressions(expressionsOfTheMonth);
        }

        const gendersMonth = async() =>{

            const record = await getGendersForMonth(token, month+1, year);  
            const gendersOfTheMonth = [];

            //Load genderOfTheMonth with the days of the month
            for (let i = 1; i < daysMonth; i++) { 
                gendersOfTheMonth.push([]);
                //Load gendersOfTheMonth with the records
                record.data.forEach(el => {
                    if(i === el.day) gendersOfTheMonth[i-1].push(el) 
                });
            }

            let count = 0;
            gendersOfTheMonth.forEach(el => {
                gendersOfTheMonth[count] = averagePorcentageGenders(el);
                count += 1;
            });

            setGenders(gendersOfTheMonth);
        }

        const agesMonth = async() =>{
            const record = await getAgesForMonth(token, month+1, year);

            const agesOfTheMonth = [];

            //Load agesOfTheMonth with the days of the month
            for (let i = 1; i < daysMonth; i++) { 
                agesOfTheMonth.push([]);
                //Load agesOfTheMonth with the records
                record.data.forEach(el => {
                    if(i === el.day) agesOfTheMonth[i-1].push(el) 
                });
            }

            let count = 0;
            agesOfTheMonth.forEach(el => {
                agesOfTheMonth[count] = averagePorcentageAges(el);
                count += 1;
            });

            setAges(agesOfTheMonth);
        }

        expressionsMonth();
        gendersMonth();
        agesMonth();

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
                            <span className="px-4 text-3xl font-extrabold tracking-wider leading-none tracking-tight text-gray-dark md:text-5xl lg:text-6xl dark:text-white">REPORTE MENSUAL</span>
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
                            <span className="pl-4 text-md leading-none tracking-wide uppercase text-gray-dark md:text-lg lg:text-2xl dark:text-white">{`${res.months[month]} de ${year}`}</span>
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

                         {expressions && genders && ages ? 
                            <>
                                <TablesDetections 
                                    day={`1 de ${res.months[month]}`}
                                    expressions={expressions[0]}
                                    genders={genders[0]}
                                    ages={ages[0]} 
                                />  
                                <TablesDetections 
                                    day={`2 de ${res.months[month]}`}
                                    expressions={expressions[1]}
                                    genders={genders[1]}
                                    ages={ages[1]} 
                                /> 
                                <TablesDetections 
                                    day={`3 de ${res.months[month]}`} 
                                    expressions={expressions[2]}
                                    genders={genders[2]}
                                    ages={ages[2]} 
                                /> 
                                <TablesDetections 
                                    day={`4 de ${res.months[month]}`}
                                    expressions={expressions[3]}
                                    genders={genders[3]}
                                    ages={ages[3]} 
                                /> 
                                <TablesDetections 
                                    day={`5 de ${res.months[month]}`}
                                    expressions={expressions[4]}
                                    genders={genders[4]}
                                    ages={ages[4]} 
                                /> 
                                <TablesDetections 
                                    day={`6 de ${res.months[month]}`} 
                                    expressions={expressions[5]}
                                    genders={genders[5]}
                                    ages={ages[5]} 
                                /> 
                                <TablesDetections 
                                    day={`7 de ${res.months[month]}`}
                                    expressions={expressions[6]}
                                    genders={genders[6]}
                                    ages={ages[6]} 
                                /> 
                                <TablesDetections 
                                    day={`8 de ${res.months[month]}`}
                                    expressions={expressions[7]}
                                    genders={genders[7]}
                                    ages={ages[7]} 
                                /> 
                                <TablesDetections 
                                    day={`9 de ${res.months[month]}`}
                                    expressions={expressions[8]}
                                    genders={genders[8]}
                                    ages={ages[8]} 
                                /> 
                                <TablesDetections 
                                    day={`10 de ${res.months[month]}`}
                                    expressions={expressions[9]}
                                    genders={genders[9]}
                                    ages={ages[9]} 
                                /> 
                                <TablesDetections 
                                    day={`11 de ${res.months[month]}`}
                                    expressions={expressions[10]}
                                    genders={genders[10]}
                                    ages={ages[10]} 
                                /> 
                                <TablesDetections 
                                    day={`12 de ${res.months[month]}`}
                                    expressions={expressions[11]}
                                    genders={genders[11]}
                                    ages={ages[11]} 
                                /> 
                                <TablesDetections 
                                    day={`13 de ${res.months[month]}`}
                                    expressions={expressions[12]}
                                    genders={genders[12]}
                                    ages={ages[12]} 
                                /> 
                                <TablesDetections 
                                    day={`14 de ${res.months[month]}`}
                                    expressions={expressions[13]}
                                    genders={genders[13]}
                                    ages={ages[13]} 
                                /> 
                                <TablesDetections 
                                    day={`15 de ${res.months[month]}`}
                                    expressions={expressions[14]}
                                    genders={genders[14]}
                                    ages={ages[14]} 
                                /> 
                                <TablesDetections 
                                    day={`16 de ${res.months[month]}`}
                                    expressions={expressions[15]}
                                    genders={genders[15]}
                                    ages={ages[15]} 
                                /> 
                                <TablesDetections 
                                    day={`17 de ${res.months[month]}`}
                                    expressions={expressions[16]}
                                    genders={genders[16]}
                                    ages={ages[16]} 
                                /> 
                                <TablesDetections 
                                    day={`18 de ${res.months[month]}`}
                                    expressions={expressions[17]}
                                    genders={genders[17]}
                                    ages={ages[17]} 
                                /> 
                                <TablesDetections 
                                    day={`19 de ${res.months[month]}`}
                                    expressions={expressions[18]}
                                    genders={genders[18]}
                                    ages={ages[18]} 
                                /> 
                                <TablesDetections 
                                    day={`20 de ${res.months[month]}`}
                                    expressions={expressions[19]}
                                    genders={genders[19]}
                                    ages={ages[19]} 
                                /> 
                                <TablesDetections 
                                    day={`21 de ${res.months[month]}`}
                                    expressions={expressions[20]}
                                    genders={genders[20]}
                                    ages={ages[20]} 
                                /> 
                                <TablesDetections 
                                    day={`22 de ${res.months[month]}`}
                                    expressions={expressions[21]}
                                    genders={genders[21]}
                                    ages={ages[21]} 
                                /> 
                                <TablesDetections 
                                    day={`23 de ${res.months[month]}`}
                                    expressions={expressions[22]}
                                    genders={genders[22]}
                                    ages={ages[22]} 
                                /> 
                                <TablesDetections 
                                    day={`24 de ${res.months[month]}`}
                                    expressions={expressions[23]}
                                    genders={genders[23]}
                                    ages={ages[23]} 
                                /> 
                                <TablesDetections 
                                    day={`25 de ${res.months[month]}`}
                                    expressions={expressions[24]}
                                    genders={genders[24]}
                                    ages={ages[24]} 
                                /> 
                                <TablesDetections 
                                    day={`26 de ${res.months[month]}`}
                                    expressions={expressions[25]}
                                    genders={genders[25]}
                                    ages={ages[25]} 
                                />
                                <TablesDetections 
                                    day={`27 de ${res.months[month]}`}
                                    expressions={expressions[26]}
                                    genders={genders[26]}
                                    ages={ages[26]} 
                                /> 
                                {genders[27] ? 
                                    <TablesDetections 
                                        day={`28 de ${res.months[month]}`}
                                        expressions={expressions[27]}
                                        genders={genders[27]}
                                        ages={ages[27]} 
                                    /> :
                                    null
                                }
                                {genders[28] ? 
                                    <TablesDetections 
                                        day={`29 de ${res.months[month]}`}
                                        expressions={expressions[28]}
                                        genders={genders[28]}
                                        ages={ages[28]} 
                                    /> :
                                    null
                                }
                                {genders[29] ? 
                                    <TablesDetections 
                                        day={`30 de ${res.months[month]}`}
                                        expressions={expressions[29]}
                                        genders={genders[29]}
                                        ages={ages[29]} 
                                    /> :
                                    null
                                }
                                {genders[30] ? 
                                    <TablesDetections 
                                        day={`31 de ${res.months[month]}`}
                                        expressions={expressions[30]}
                                        genders={genders[30]}
                                        ages={ages[30]} 
                                    /> :
                                    null
                                }
                            </>
                            :
                            <div className="lg:ml-72 ml-14 my-12">
                                <span className="px-4 mt-12 text-center mx-auto text-2xl font-bold tracking-wider leading-none tracking-tight text-gray-dark md:text-3xl lg:text-4xl dark:text-white">Cargando...</span>
                            </div>
                        }  
                        
                    </div>

                </div>
                    
            </div>
        </div>
    )
}