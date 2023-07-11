import { useEffect, useState } from "react";

//Dependencies


//Components
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar"; 
import { TablesDetections } from "../../components/TableDetections";

//Others
import { Unfold } from "../../helpers/Unfold"; 
import { getDaysMonths } from "../../helpers/GetDaysMonths";
import { getExpressionsForYear } from '../../api/expressions.api';
import { getGendersForYear } from '../../api/genders.api';
import { getAgesForYear } from '../../api/ages.api';
import { averagePorcentageExpressions, averagePorcentageGenders, averagePorcentageAges } from "../../helpers/AveragePorcentange";
import logo from "../../assets/img/logos/expressionsIA2.png";


export function ReportsYear() {

    const [expressions, setExpressions] = useState(false);
    const [genders, setGenders] = useState(false);
    const [ages, setAges] = useState(false);

    const name = `${localStorage.getItem('name')} ${localStorage.getItem('last_name')}`;
    const organization = localStorage.getItem('organization');
    const today = new Date();
    const res = getDaysMonths();
    const token = sessionStorage.getItem('token');
    const year = today.getFullYear();

    useEffect(() => {

        const expressionsYear = async() =>{
            const record = await getExpressionsForYear(token, year);

            const expressionsOfTheYear = {
                january: [],
                february: [],
                march: [],
                april: [],
                may: [],
                june: [],
                july: [],
                august: [],
                september: [],
                octuber: [],
                november: [],
                december: []
            }
          
            // Group expressions by year
            record.data.forEach(el => {
                let month = res.months[today.getMonth()];
                if(month === "Enero") expressionsOfTheYear.january.push(el);
                if(month === "Febrero") expressionsOfTheYear.february.push(el);
                if(month === "Marzo") expressionsOfTheYear.march.push(el);
                if(month === "Abril") expressionsOfTheYear.april.push(el);
                if(month === "Mayo") expressionsOfTheYear.may.push(el);
                if(month === "Junio") expressionsOfTheYear.june.push(el);
                if(month === "Julio") expressionsOfTheYear.july.push(el);
                if(month === "August") expressionsOfTheYear.august.push(el);
                if(month === "Septiembre") expressionsOfTheYear.september.push(el);
                if(month === "Obtubre") expressionsOfTheYear.octuber.push(el);
                if(month === "Noviembre") expressionsOfTheYear.november.push(el);
                if(month === "Diciembre") expressionsOfTheYear.december.push(el);
            });

            // Average porcentaje of expressions per day
            expressionsOfTheYear.january = averagePorcentageExpressions(expressionsOfTheYear.january);
            expressionsOfTheYear.february = averagePorcentageExpressions(expressionsOfTheYear.february);
            expressionsOfTheYear.march = averagePorcentageExpressions(expressionsOfTheYear.march);
            expressionsOfTheYear.april = averagePorcentageExpressions(expressionsOfTheYear.april);
            expressionsOfTheYear.may = averagePorcentageExpressions(expressionsOfTheYear.may);
            expressionsOfTheYear.june = averagePorcentageExpressions(expressionsOfTheYear.june);
            expressionsOfTheYear.july = averagePorcentageExpressions(expressionsOfTheYear.july);
            expressionsOfTheYear.august = averagePorcentageExpressions(expressionsOfTheYear.august);
            expressionsOfTheYear.september = averagePorcentageExpressions(expressionsOfTheYear.september);
            expressionsOfTheYear.octuber = averagePorcentageExpressions(expressionsOfTheYear.octuber);
            expressionsOfTheYear.november = averagePorcentageExpressions(expressionsOfTheYear.november);
            expressionsOfTheYear.december = averagePorcentageExpressions(expressionsOfTheYear.december);

            setExpressions(expressionsOfTheYear);
        }

        const gendersYear = async() =>{
            const record = await getGendersForYear(token, year);
            const gendersOfTheYear = {
                january: [],
                february: [],
                march: [],
                april: [],
                may: [],
                june: [],
                july: [],
                august: [],
                september: [],
                octuber: [],
                november: [],
                december: []
            }
          
            // Group genders by year
            record.data.forEach(el => {
                let month = res.months[today.getMonth()];
                if(month === "Enero") gendersOfTheYear.january.push(el);
                if(month === "Febrero") gendersOfTheYear.february.push(el);
                if(month === "Marzo") gendersOfTheYear.march.push(el);
                if(month === "Abril") gendersOfTheYear.april.push(el);
                if(month === "Mayo") gendersOfTheYear.may.push(el);
                if(month === "Junio") gendersOfTheYear.june.push(el);
                if(month === "Julio") gendersOfTheYear.july.push(el);
                if(month === "August") gendersOfTheYear.august.push(el);
                if(month === "Septiembre") gendersOfTheYear.september.push(el);
                if(month === "Obtubre") gendersOfTheYear.octuber.push(el);
                if(month === "Noviembre") gendersOfTheYear.november.push(el);
                if(month === "Diciembre") gendersOfTheYear.december.push(el);
            });

            // Average porcentaje of genders per day
            gendersOfTheYear.january = averagePorcentageGenders(gendersOfTheYear.january);
            gendersOfTheYear.february = averagePorcentageGenders(gendersOfTheYear.february);
            gendersOfTheYear.march = averagePorcentageGenders(gendersOfTheYear.march);
            gendersOfTheYear.april = averagePorcentageGenders(gendersOfTheYear.april);
            gendersOfTheYear.may = averagePorcentageGenders(gendersOfTheYear.may);
            gendersOfTheYear.june = averagePorcentageGenders(gendersOfTheYear.june);
            gendersOfTheYear.july = averagePorcentageGenders(gendersOfTheYear.july);
            gendersOfTheYear.august = averagePorcentageGenders(gendersOfTheYear.august);
            gendersOfTheYear.september = averagePorcentageGenders(gendersOfTheYear.september);
            gendersOfTheYear.octuber = averagePorcentageGenders(gendersOfTheYear.octuber);
            gendersOfTheYear.november = averagePorcentageGenders(gendersOfTheYear.november);
            gendersOfTheYear.december = averagePorcentageGenders(gendersOfTheYear.december);

            setGenders(gendersOfTheYear);
        }

        const agesYear = async() =>{
            const record = await getAgesForYear(token, year);
            const agesOfTheYear = {
                january: [],
                february: [],
                march: [],
                april: [],
                may: [],
                june: [],
                july: [],
                august: [],
                september: [],
                octuber: [],
                november: [],
                december: []
            }
          
            // Group genders by year
            record.data.forEach(el => {
                let month = res.months[today.getMonth()];
                if(month === "Enero") agesOfTheYear.january.push(el);
                if(month === "Febrero") agesOfTheYear.february.push(el);
                if(month === "Marzo") agesOfTheYear.march.push(el);
                if(month === "Abril") agesOfTheYear.april.push(el);
                if(month === "Mayo") agesOfTheYear.may.push(el);
                if(month === "Junio") agesOfTheYear.june.push(el);
                if(month === "Julio") agesOfTheYear.july.push(el);
                if(month === "August") agesOfTheYear.august.push(el);
                if(month === "Septiembre") agesOfTheYear.september.push(el);
                if(month === "Obtubre") agesOfTheYear.octuber.push(el);
                if(month === "Noviembre") agesOfTheYear.november.push(el);
                if(month === "Diciembre") agesOfTheYear.december.push(el);
            });

            // Average porcentaje of genders per day
            agesOfTheYear.january = averagePorcentageAges(agesOfTheYear.january);
            agesOfTheYear.february = averagePorcentageAges(agesOfTheYear.february);
            agesOfTheYear.march = averagePorcentageAges(agesOfTheYear.march);
            agesOfTheYear.april = averagePorcentageAges(agesOfTheYear.april);
            agesOfTheYear.may = averagePorcentageAges(agesOfTheYear.may);
            agesOfTheYear.june = averagePorcentageAges(agesOfTheYear.june);
            agesOfTheYear.july = averagePorcentageAges(agesOfTheYear.july);
            agesOfTheYear.august = averagePorcentageAges(agesOfTheYear.august);
            agesOfTheYear.september = averagePorcentageAges(agesOfTheYear.september);
            agesOfTheYear.octuber = averagePorcentageAges(agesOfTheYear.octuber);
            agesOfTheYear.november = averagePorcentageAges(agesOfTheYear.november);
            agesOfTheYear.december = averagePorcentageAges(agesOfTheYear.december);

            setAges(agesOfTheYear);
        }

        expressionsYear();
        gendersYear();
        agesYear();

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
                            <span className="px-4 text-3xl font-extrabold tracking-wider leading-none tracking-tight text-gray-dark md:text-5xl lg:text-6xl dark:text-white">REPORTE ANUAL</span>
                        </div>
                        <img className="img-user w-32 h-32" src={logo} alt="user photo" id="img-user"/>
                    </div>
                    <div className="lg:flex block lg:justify-between px-4 mt-16">
                        <div className='relative px-3 pt-2 pb-5 lg:w-2/4 md:2/3 bg-white-custon-dark border border-gray-200 rounded-sm'>
                            <span className="px-2 text-md leading-none tracking-wide text-gray-dark md:text-lg lg:text-2xl dark:text-white">NOMBRE:</span>
                            <span className="pl-4 text-md leading-none tracking-wide uppercase text-gray-dark md:text-lg lg:text-2xl dark:text-white">{name}</span>
                        </div>
                        <div className='w-auto relative px-3 pt-2 pb-5 w-2/6 bg-white-custon-dark border border-gray-200 rounded-sm mt-8 lg:mt-0'>
                            <span className="px-2 text-md leading-none tracking-wide text-gray-dark md:text-lg lg:text-2xl dark:text-white">AÑO:</span>
                            <span className="pl-4 text-md leading-none tracking-wide uppercase text-gray-dark md:text-lg lg:text-2xl dark:text-white">{year}</span>
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
                                    day="Enero" 
                                    expressions={expressions.january}
                                    genders={genders.january}
                                    ages={ages.january} 
                                />  
                                <TablesDetections 
                                    day="Febrero" 
                                    expressions={expressions.february}
                                    genders={genders.february}
                                    ages={ages.february} 
                                /> 
                                <TablesDetections 
                                    day="Marzo" 
                                    expressions={expressions.march}
                                    genders={genders.march}
                                    ages={ages.march}  
                                /> 
                                <TablesDetections 
                                    day="Abril" 
                                    expressions={expressions.april}
                                    genders={genders.april}
                                    ages={ages.april}  
                                /> 
                                <TablesDetections 
                                    day="Mayo" 
                                    expressions={expressions.may}
                                    genders={genders.may}
                                    ages={ages.may}  
                                /> 
                                <TablesDetections 
                                    day="Junio" 
                                    expressions={expressions.june}
                                    genders={genders.june}
                                    ages={ages.june}  
                                /> 
                                <TablesDetections 
                                    day="Julio" 
                                    expressions={expressions.july}
                                    genders={genders.july}
                                    ages={ages.july}  
                                /> 
                                <TablesDetections 
                                    day="Agosto" 
                                    expressions={expressions.august}
                                    genders={genders.august}
                                    ages={ages.august}  
                                /> 
                                <TablesDetections 
                                    day="Septiembre" 
                                    expressions={expressions.september}
                                    genders={genders.september}
                                    ages={ages.september}  
                                /> 
                                <TablesDetections 
                                    day="Octubre" 
                                    expressions={expressions.octuber}
                                    genders={genders.octuber}
                                    ages={ages.octuber}  
                                /> 
                                <TablesDetections 
                                    day="Noviembre" 
                                    expressions={expressions.november}
                                    genders={genders.november}
                                    ages={ages.november}  
                                /> 
                                <TablesDetections 
                                    day="Diciembre" 
                                    expressions={expressions.december}
                                    genders={genders.december}
                                    ages={ages.december}  
                                /> 
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