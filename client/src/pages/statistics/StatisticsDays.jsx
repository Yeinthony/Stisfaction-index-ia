import { useEffect, useState } from "react";

//Components
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar"; 
import { VerticalBar } from "../../components/charts/bars/VerticalBar";
import { HorizontalBar } from "../../components/charts/bars/HorizontalBar";
import { PieChart } from "../../components/charts/pie/pie";

//Others
import { Unfold } from "../../helpers/Unfold"; 
import { getDaysMonths } from "../../helpers/GetDaysMonths"; 
import { getExpressionsForDay } from "../../api/expressions.api";
import { getGendersForDay } from "../../api/genders.api";
import { getAgesForDay } from "../../api/ages.api";
import { averagePorcentageExpressions, averagePorcentageGenders, averagePorcentageAges } from "../../helpers/AveragePorcentange";


export function StatisticsDays() {

    const [expressions, setExpressions] = useState({});
    const [genders, setGenders] = useState({});
    const [ages, setAges] = useState({});

    const today = new Date();
    const res = getDaysMonths();
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
                <div className="flex justify-center mt-16">
                    <span className="px-4 text-center text-1xl font-extrabold leading-none tracking-tight text-gray-dark md:text-2xl lg:text-3xl dark:text-white">{`${res.days[today.getDay()]} ${today.getDate()} de ${res.months[today.getMonth()]} de ${today.getFullYear()}`}</span>
                </div>
                <div className="px-4 rounded-lg dark:border-gray-700 mt-6">

                    <div className="flex">

                        <div className='relative p-6 w-2/4 h-2/4 bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                            {expressions ?
                                <PieChart 
                                    title="Expresiones detectadas" 
                                    labels={["Enojo", "Disgusto", "Miedo", "Felicidad", "Neutral", "Tristeza", "Sorpresa"]} 
                                    dataset={[
                                        expressions.angry, 
                                        expressions.disgust, 
                                        expressions.fear, 
                                        expressions.happy, 
                                        expressions.neutral, 
                                        expressions.sad, 
                                        expressions.surprise
                                    ]}
                                 />:
                                 <PieChart 
                                    title="Expresiones detectadas" 
                                    labels={["Enojo", "Disgusto", "Miedo", "Felicidad", "Neutral", "Tristeza", "Sorpresa"]} 
                                    dataset={[0, 0, 0, 0, 0, 0, 0]}
                                 />
                            }
                        </div>

                        <div className="w-2/4 h-max ml-4">

                            <div className='relative p-6 w-full flex justify-center h-60 bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                                {genders ?
                                    <HorizontalBar 
                                        title="Generos detectados" 
                                        labels={["M", "F"]} 
                                        dataset={[genders.male, genders.female]}
                                    />:
                                    <HorizontalBar 
                                        title="Generos detectados" 
                                        labels={["M", "F"]} 
                                        dataset={[0, 0]}
                                    />
                                }
                                
                            </div>   

                            <div className='relative flex justify-center mt-4 p-6 w-full h-64 bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                                {ages ? 
                                    <VerticalBar 
                                        title="Edades detectadas" 
                                        labels={["6-11", "12-18", "19-26", "27-59", "60-80"]} 
                                        dataset={[
                                            ages.six_to_eleven, 
                                            ages.twelve_to_eighteen, 
                                            ages.nineteen_to_twentysix, 
                                            ages.twentyseveven_to_fiftynine,
                                            ages.sixty_to_eighty
                                        ]}
                                    />:
                                    <VerticalBar 
                                        title="Edades detectadas" 
                                        labels={["6-11", "12-18", "19-26", "27-59", "60-80"]} 
                                        dataset={[0, 0, 0, 0, 0]}
                                    />
                                }
                            </div>      

                        </div>

                    </div>                   
                                                         
                </div>
                    
            </div>
        </div>
    )
}