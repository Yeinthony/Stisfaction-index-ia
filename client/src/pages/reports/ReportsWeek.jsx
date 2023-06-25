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
import { colorExpretions } from '../../helpers/ColorsExpretions';
import { getExpressionsForWeek } from '../../api/expressions.api';
import { getGendersForWeek } from '../../api/genders.api';
import { getAgesForWeek } from '../../api/ages.api';
import { averagePorcentageExpressions, averagePorcentageGenders, averagePorcentageAges } from "../../helpers/AveragePorcentange";
import logo from "../../assets/img/logos/expressionsIA2.png";


export function ReportsWeek() {

    const [expressions, setExpressions] = useState(false);
    const [genders, setGenders] = useState(false);
    const [ages, setAges] = useState(false);

    const name = `${localStorage.getItem('name')} ${localStorage.getItem('last_name')}`;
    const today = new Date();
    const res = getDaysMonths();
    const token = sessionStorage.getItem('token');
    const week = DateTime.local().weekNumber;
    const year = today.getFullYear();
    
    useEffect(() => {

        const expressionsWeek = async() =>{
            const record = await getExpressionsForWeek(token, week, year);

            const expressionsOfTheWeek = {
                monday: {
                    day:"monday",
                    expressions: []
                },
                tuesday: {
                    day: "tuesday",
                    expressions: []
                },
                wednesday: {
                    day: "wednesday",
                    expressions: []
                },
                thursday: {
                    day: "thursday",
                    expressions: []
                },
                friday: {
                    day: "friday",
                    expressions: []
                },
                saturday: {
                    day: "saturday",
                    expressions: []
                },
                sunday: {
                    day: "sunday",
                    expressions: []
                }
            }
          
            // Group expressions by day
            record.data.forEach(el => {
                let date = new Date(el.year, el.month-1, el.day);
                let day = res.days[date.getDay()];
                if(day === "Lunes") expressionsOfTheWeek.monday.expressions.push(el);
                if(day === "Martes") expressionsOfTheWeek.tuesday.expressions.push(el);
                if(day === "Miercoles") expressionsOfTheWeek.wednesday.expressions.push(el);
                if(day === "Jueves") expressionsOfTheWeek.thursday.expressions.push(el);
                if(day === "Viernes") expressionsOfTheWeek.friday.expressions.push(el);
                if(day === "Sabado") expressionsOfTheWeek.saturday.expressions.push(el);
                if(day === "Domingo") expressionsOfTheWeek.sunday.expressions.push(el);
            });

            // Average porcentaje of expressions per day
            expressionsOfTheWeek.monday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.monday.expressions);
            expressionsOfTheWeek.tuesday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.tuesday.expressions);
            expressionsOfTheWeek.wednesday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.wednesday.expressions);
            expressionsOfTheWeek.thursday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.thursday.expressions);
            expressionsOfTheWeek.friday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.friday.expressions);
            expressionsOfTheWeek.saturday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.saturday.expressions);
            expressionsOfTheWeek.sunday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.sunday.expressions);

            console.log(expressionsOfTheWeek);

            setExpressions(expressionsOfTheWeek);
        }

        const gendersWeek = async() =>{
            const record = await getGendersForWeek(token, week, year);
            const gendersOfTheWeek = {
                monday: {
                    day:"monday",
                    genders: []
                },
                tuesday: {
                    day: "tuesday",
                    genders: []
                },
                wednesday: {
                    day: "wednesday",
                    genders: []
                },
                thursday: {
                    day: "thursday",
                    genders: []
                },
                friday: {
                    day: "friday",
                    genders: []
                },
                saturday: {
                    day: "saturday",
                    genders: []
                },
                sunday: {
                    day: "sunday",
                    genders: []
                }
            }
          
            // Group expressions by day
            record.data.forEach(el => {
                let date = new Date(el.year, el.month-1, el.day);
                let day = res.days[date.getDay()];
                if(day === "Lunes") gendersOfTheWeek.monday.genders.push(el);
                if(day === "Martes") gendersOfTheWeek.tuesday.genders.push(el);
                if(day === "Miercoles") gendersOfTheWeek.wednesday.genders.push(el);
                if(day === "Jueves") gendersOfTheWeek.thursday.genders.push(el);
                if(day === "Viernes") gendersOfTheWeek.friday.genders.push(el);
                if(day === "Sabado") gendersOfTheWeek.saturday.genders.push(el);
                if(day === "Domingo") gendersOfTheWeek.sunday.genders.push(el);
            });

            // Average porcentaje of expressions per day
            gendersOfTheWeek.monday.genders = averagePorcentageGenders(gendersOfTheWeek.monday.genders);
            gendersOfTheWeek.tuesday.genders = averagePorcentageGenders(gendersOfTheWeek.tuesday.genders);
            gendersOfTheWeek.wednesday.genders = averagePorcentageGenders(gendersOfTheWeek.wednesday.genders);
            gendersOfTheWeek.thursday.genders = averagePorcentageGenders(gendersOfTheWeek.thursday.genders);
            gendersOfTheWeek.friday.genders = averagePorcentageGenders(gendersOfTheWeek.friday.genders);
            gendersOfTheWeek.saturday.genders = averagePorcentageGenders(gendersOfTheWeek.saturday.genders);
            gendersOfTheWeek.sunday.genders = averagePorcentageGenders(gendersOfTheWeek.sunday.genders);

            console.log(gendersOfTheWeek);
            setGenders(gendersOfTheWeek);
        }

        const agesWeek = async() =>{
            const record = await getAgesForWeek(token, week, year);
            const agesOfTheWeek = {
                monday: {
                    day:"monday",
                    ages: []
                },
                tuesday: {
                    day: "tuesday",
                    ages: []
                },
                wednesday: {
                    day: "wednesday",
                    ages: []
                },
                thursday: {
                    day: "thursday",
                    ages: []
                },
                friday: {
                    day: "friday",
                    ages: []
                },
                saturday: {
                    day: "saturday",
                    ages: []
                },
                sunday: {
                    day: "sunday",
                    ages: []
                }
            }
          
            // Group expressions by day
            record.data.forEach(el => {
                let date = new Date(el.year, el.month-1, el.day);
                let day = res.days[date.getDay()];
                if(day === "Lunes") agesOfTheWeek.monday.ages.push(el);
                if(day === "Martes") agesOfTheWeek.tuesday.ages.push(el);
                if(day === "Miercoles") agesOfTheWeek.wednesday.ages.push(el);
                if(day === "Jueves") agesOfTheWeek.thursday.ages.push(el);
                if(day === "Viernes") agesOfTheWeek.friday.ages.push(el);
                if(day === "Sabado") agesOfTheWeek.saturday.ages.push(el);
                if(day === "Domingo") agesOfTheWeek.sunday.ages.push(el);
            });

            // Average porcentaje of expressions per day
            agesOfTheWeek.monday.ages = averagePorcentageAges(agesOfTheWeek.monday.ages);
            agesOfTheWeek.tuesday.ages = averagePorcentageAges(agesOfTheWeek.tuesday.ages);
            agesOfTheWeek.wednesday.ages = averagePorcentageAges(agesOfTheWeek.wednesday.ages);
            agesOfTheWeek.thursday.ages = averagePorcentageAges(agesOfTheWeek.thursday.ages);
            agesOfTheWeek.friday.ages = averagePorcentageAges(agesOfTheWeek.friday.ages);
            agesOfTheWeek.saturday.ages = averagePorcentageAges(agesOfTheWeek.saturday.ages);
            agesOfTheWeek.sunday.ages = averagePorcentageAges(agesOfTheWeek.sunday.ages);

            console.log(agesOfTheWeek);
            setAges(agesOfTheWeek);
        }

        expressionsWeek();
        gendersWeek();
        agesWeek();

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
                            <span className="px-4 text-3xl font-extrabold tracking-wider leading-none tracking-tight text-gray-dark md:text-5xl lg:text-6xl dark:text-white">REPORTE SEMANAL</span>
                        </div>
                        <img className="img-user w-32 h-32" src={logo} alt="user photo" id="img-user"/>
                    </div>
                    <div className="flex justify-between px-4 mt-16">
                        <div className='relative px-3 pt-2 pb-5 lg:w-2/4 md:2/3 bg-white-custon-dark border border-gray-200 rounded-sm'>
                            <span className="px-2 text-md leading-none tracking-wide text-gray-dark md:text-lg lg:text-2xl dark:text-white">NOMBRE:</span>
                            <span className="pl-4 text-md leading-none tracking-wide uppercase text-gray-dark md:text-lg lg:text-2xl dark:text-white">{name}</span>
                        </div>
                        <div className='relative px-3 pt-2 pb-5 w-2/6 bg-white-custon-dark border border-gray-200 rounded-sm '>
                            <span className="px-2 text-md leading-none tracking-wide text-gray-dark md:text-lg lg:text-2xl dark:text-white">Fecha:</span>
                            <span className="pl-4 text-md leading-none tracking-wide uppercase text-gray-dark md:text-lg lg:text-2xl dark:text-white">{`${today.getDate()}/${[today.getMonth()]}/${today.getFullYear()}`}</span>
                        </div>
                    </div>
                    <div className="px-4 mt-36">
                        <div className="flex justify-center">
                            <span className="px-4 text-2xl font-bold tracking-wider leading-none tracking-tight text-gray-dark md:text-3xl lg:text-4xl dark:text-white">DETALLES DE LAS DETECCIONES</span>
                        </div>

                         {expressions && genders && ages ? 
                            <>
                                <TablesDetections 
                                    day="Lunes" 
                                    expressions={expressions.monday.expressions}
                                    genders={genders.monday.genders}
                                    ages={ages.monday.ages} 
                                />  
                                <TablesDetections 
                                    day="Martes" 
                                    expressions={expressions.tuesday.expressions}
                                    genders={genders.tuesday.genders}
                                    ages={ages.tuesday.ages} 
                                /> 
                                <TablesDetections 
                                    day="Miercoles" 
                                    expressions={expressions.wednesday.expressions}
                                    genders={genders.wednesday.genders}
                                    ages={ages.wednesday.ages} 
                                /> 
                                <TablesDetections 
                                    day="Jueves" 
                                    expressions={expressions.thursday.expressions}
                                    genders={genders.thursday.genders}
                                    ages={ages.thursday.ages} 
                                /> 
                                <TablesDetections 
                                    day="Viernes" 
                                    expressions={expressions.friday.expressions}
                                    genders={genders.friday.genders}
                                    ages={ages.friday.ages} 
                                /> 
                                <TablesDetections 
                                    day="Sabado" 
                                    expressions={expressions.saturday.expressions}
                                    genders={genders.saturday.genders}
                                    ages={ages.saturday.ages} 
                                /> 
                                <TablesDetections 
                                    day="Domingo" 
                                    expressions={expressions.sunday.expressions}
                                    genders={genders.sunday.genders}
                                    ages={ages.sunday.ages} 
                                /> 
                            </>
                            :
                            <div className="ml-72 my-16">
                                <span className="px-4 mt-12 text-center mx-auto text-2xl font-bold tracking-wider leading-none tracking-tight text-gray-dark md:text-3xl lg:text-4xl dark:text-white">Cargando...</span>
                            </div>
                        }  
                        
                    </div>

                </div>
                    
            </div>
        </div>
    )
}