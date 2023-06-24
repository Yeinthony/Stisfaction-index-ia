import { useState, useEffect } from 'react';

//Dependencies
import { DateTime } from 'luxon';

//Components
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar"; 
import { Area } from "../../components/charts/area/Area"; 

//Others
import { Unfold } from "../../helpers/Unfold"; 
import { getDaysMonths } from "../../helpers/GetDaysMonths";
import { colorExpretions } from '../../helpers/ColorsExpretions';
import { getExpressionsForWeek } from '../../api/expressions.api';
import { getGendersForWeek } from '../../api/genders.api';
import { getAgesForWeek } from '../../api/ages.api';
import { averagePorcentageExpressions, averagePorcentageGenders, averagePorcentageAges } from "../../helpers/AveragePorcentange";


export function StatisticsWeek() {

    const [expressions, setExpressions] = useState(false);
    const [genders, setGenders] = useState(false);
    const [ages, setAges] = useState(false);

    const today = new Date();
    const res = getDaysMonths();
    const colors = colorExpretions()
    const token = sessionStorage.getItem('token');
    const week = DateTime.local().weekNumber;
    const year = today.getFullYear();
    
    useEffect(() => {

        const expressionsWeek = async() =>{
            const record = await getExpressionsForWeek(token, week, year);

            const expressionsOfTheWeek = {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: []
            }
          
            // Group expressions by day
            record.data.forEach(el => {
                let date = new Date(el.year, el.month-1, el.day);
                let day = res.days[date.getDay()];
                if(day === "Lunes") expressionsOfTheWeek.monday.push(el);
                if(day === "Martes") expressionsOfTheWeek.tuesday.push(el);
                if(day === "Miercoles") expressionsOfTheWeek.wednesday.push(el);
                if(day === "Jueves") expressionsOfTheWeek.thursday.push(el);
                if(day === "Viernes") expressionsOfTheWeek.friday.push(el);
                if(day === "Sabado") expressionsOfTheWeek.saturday.push(el);
                if(day === "Domingo") expressionsOfTheWeek.sunday.push(el);
            });

            // Average porcentaje of expressions per day
            expressionsOfTheWeek.monday = averagePorcentageExpressions(expressionsOfTheWeek.monday);
            expressionsOfTheWeek.tuesday = averagePorcentageExpressions(expressionsOfTheWeek.tuesday);
            expressionsOfTheWeek.wednesday = averagePorcentageExpressions(expressionsOfTheWeek.wednesday);
            expressionsOfTheWeek.thursday = averagePorcentageExpressions(expressionsOfTheWeek.thursday);
            expressionsOfTheWeek.friday = averagePorcentageExpressions(expressionsOfTheWeek.friday);
            expressionsOfTheWeek.saturday = averagePorcentageExpressions(expressionsOfTheWeek.saturday);
            expressionsOfTheWeek.sunday = averagePorcentageExpressions(expressionsOfTheWeek.sunday);

            setExpressions({
                angry: [
                    expressionsOfTheWeek.monday.angry,
                    expressionsOfTheWeek.tuesday.angry,
                    expressionsOfTheWeek.wednesday.angry,
                    expressionsOfTheWeek.thursday.angry,
                    expressionsOfTheWeek.friday.angry,
                    expressionsOfTheWeek.saturday.angry,
                    expressionsOfTheWeek.sunday.angry,
                ],
                disgust: [
                    expressionsOfTheWeek.monday.disgust,
                    expressionsOfTheWeek.tuesday.disgust,
                    expressionsOfTheWeek.wednesday.disgust,
                    expressionsOfTheWeek.thursday.disgust,
                    expressionsOfTheWeek.friday.disgust,
                    expressionsOfTheWeek.saturday.disgust,
                    expressionsOfTheWeek.sunday.disgust,
                ],
                fear: [
                    expressionsOfTheWeek.monday.fear,
                    expressionsOfTheWeek.tuesday.fear,
                    expressionsOfTheWeek.wednesday.fear,
                    expressionsOfTheWeek.thursday.fear,
                    expressionsOfTheWeek.friday.fear,
                    expressionsOfTheWeek.saturday.fear,
                    expressionsOfTheWeek.sunday.fear,
                ],
                happy: [
                    expressionsOfTheWeek.monday.happy,
                    expressionsOfTheWeek.tuesday.happy,
                    expressionsOfTheWeek.wednesday.happy,
                    expressionsOfTheWeek.thursday.happy,
                    expressionsOfTheWeek.friday.happy,
                    expressionsOfTheWeek.saturday.happy,
                    expressionsOfTheWeek.sunday.happy,
                ],
                neutral: [
                    expressionsOfTheWeek.monday.neutral,
                    expressionsOfTheWeek.tuesday.neutral,
                    expressionsOfTheWeek.wednesday.neutral,
                    expressionsOfTheWeek.thursday.neutral,
                    expressionsOfTheWeek.friday.neutral,
                    expressionsOfTheWeek.saturday.neutral,
                    expressionsOfTheWeek.sunday.neutral,
                ],
                sad: [
                    expressionsOfTheWeek.monday.sad,
                    expressionsOfTheWeek.tuesday.sad,
                    expressionsOfTheWeek.wednesday.sad,
                    expressionsOfTheWeek.thursday.sad,
                    expressionsOfTheWeek.friday.sad,
                    expressionsOfTheWeek.saturday.sad,
                    expressionsOfTheWeek.sunday.sad,
                ],
                surprise: [
                    expressionsOfTheWeek.monday.surprise,
                    expressionsOfTheWeek.tuesday.surprise,
                    expressionsOfTheWeek.wednesday.surprise,
                    expressionsOfTheWeek.thursday.surprise,
                    expressionsOfTheWeek.friday.surprise,
                    expressionsOfTheWeek.saturday.surprise,
                    expressionsOfTheWeek.sunday.surprise,
                ]
            });
        }

        const gendersWeek = async() =>{
            const record = await getGendersForWeek(token, week, year);
            const gendersOfTheWeek = {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: []
            }
          
            // Group expressions by day
            record.data.forEach(el => {
                let date = new Date(el.year, el.month-1, el.day);
                let day = res.days[date.getDay()];
                if(day === "Lunes") gendersOfTheWeek.monday.push(el);
                if(day === "Martes") gendersOfTheWeek.tuesday.push(el);
                if(day === "Miercoles") gendersOfTheWeek.wednesday.push(el);
                if(day === "Jueves") gendersOfTheWeek.thursday.push(el);
                if(day === "Viernes") gendersOfTheWeek.friday.push(el);
                if(day === "Sabado") gendersOfTheWeek.saturday.push(el);
                if(day === "Domingo") gendersOfTheWeek.sunday.push(el);
            });

            // Average porcentaje of expressions per day
            gendersOfTheWeek.monday = averagePorcentageGenders(gendersOfTheWeek.monday);
            gendersOfTheWeek.tuesday = averagePorcentageGenders(gendersOfTheWeek.tuesday);
            gendersOfTheWeek.wednesday = averagePorcentageGenders(gendersOfTheWeek.wednesday);
            gendersOfTheWeek.thursday = averagePorcentageGenders(gendersOfTheWeek.thursday);
            gendersOfTheWeek.friday = averagePorcentageGenders(gendersOfTheWeek.friday);
            gendersOfTheWeek.saturday = averagePorcentageGenders(gendersOfTheWeek.saturday);
            gendersOfTheWeek.sunday = averagePorcentageGenders(gendersOfTheWeek.sunday);

            setGenders({
                male: [
                    gendersOfTheWeek.monday.male,
                    gendersOfTheWeek.tuesday.male,
                    gendersOfTheWeek.wednesday.male,
                    gendersOfTheWeek.thursday.male,
                    gendersOfTheWeek.friday.male,
                    gendersOfTheWeek.saturday.male,
                    gendersOfTheWeek.sunday.male,
                ],
                female: [
                    gendersOfTheWeek.monday.female,
                    gendersOfTheWeek.tuesday.female,
                    gendersOfTheWeek.wednesday.female,
                    gendersOfTheWeek.thursday.female,
                    gendersOfTheWeek.friday.female,
                    gendersOfTheWeek.saturday.female,
                    gendersOfTheWeek.sunday.female,
                ],
            });
        }

        const agesWeek = async() =>{
            const record = await getAgesForWeek(token, week, year);
            const agesOfTheWeek = {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: []
            }
          
            // Group expressions by day
            record.data.forEach(el => {
                let date = new Date(el.year, el.month-1, el.day);
                let day = res.days[date.getDay()];
                if(day === "Lunes") agesOfTheWeek.monday.push(el);
                if(day === "Martes") agesOfTheWeek.tuesday.push(el);
                if(day === "Miercoles") agesOfTheWeek.wednesday.push(el);
                if(day === "Jueves") agesOfTheWeek.thursday.push(el);
                if(day === "Viernes") agesOfTheWeek.friday.push(el);
                if(day === "Sabado") agesOfTheWeek.saturday.push(el);
                if(day === "Domingo") agesOfTheWeek.sunday.push(el);
            });

            // Average porcentaje of expressions per day
            agesOfTheWeek.monday = averagePorcentageAges(agesOfTheWeek.monday);
            agesOfTheWeek.tuesday = averagePorcentageAges(agesOfTheWeek.tuesday);
            agesOfTheWeek.wednesday = averagePorcentageAges(agesOfTheWeek.wednesday);
            agesOfTheWeek.thursday = averagePorcentageAges(agesOfTheWeek.thursday);
            agesOfTheWeek.friday = averagePorcentageAges(agesOfTheWeek.friday);
            agesOfTheWeek.saturday = averagePorcentageAges(agesOfTheWeek.saturday);
            agesOfTheWeek.sunday = averagePorcentageAges(agesOfTheWeek.sunday);

            setAges({
                six_to_eleven: [
                    agesOfTheWeek.monday.six_to_eleven,
                    agesOfTheWeek.tuesday.six_to_eleven,
                    agesOfTheWeek.wednesday.six_to_eleven,
                    agesOfTheWeek.thursday.six_to_eleven,
                    agesOfTheWeek.friday.six_to_eleven,
                    agesOfTheWeek.saturday.six_to_eleven,
                    agesOfTheWeek.sunday.six_to_eleven,
                ],
                twelve_to_eighteen: [
                    agesOfTheWeek.monday.twelve_to_eighteen,
                    agesOfTheWeek.tuesday.twelve_to_eighteen,
                    agesOfTheWeek.wednesday.twelve_to_eighteen,
                    agesOfTheWeek.thursday.twelve_to_eighteen,
                    agesOfTheWeek.friday.twelve_to_eighteen,
                    agesOfTheWeek.saturday.twelve_to_eighteen,
                    agesOfTheWeek.sunday.twelve_to_eighteen,
                ],
                nineteen_to_twentysix: [
                    agesOfTheWeek.monday.nineteen_to_twentysix,
                    agesOfTheWeek.tuesday.nineteen_to_twentysix,
                    agesOfTheWeek.wednesday.nineteen_to_twentysix,
                    agesOfTheWeek.thursday.nineteen_to_twentysix,
                    agesOfTheWeek.friday.nineteen_to_twentysix,
                    agesOfTheWeek.saturday.nineteen_to_twentysix,
                    agesOfTheWeek.sunday.nineteen_to_twentysix,
                ],
                twentyseveven_to_fiftynine: [
                    agesOfTheWeek.monday.twentyseveven_to_fiftynine,
                    agesOfTheWeek.tuesday.twentyseveven_to_fiftynine,
                    agesOfTheWeek.wednesday.twentyseveven_to_fiftynine,
                    agesOfTheWeek.thursday.twentyseveven_to_fiftynine,
                    agesOfTheWeek.friday.twentyseveven_to_fiftynine,
                    agesOfTheWeek.saturday.twentyseveven_to_fiftynine,
                    agesOfTheWeek.sunday.twentyseveven_to_fiftynine,
                ],
                sixty_to_eighty: [
                    agesOfTheWeek.monday.sixty_to_eighty,
                    agesOfTheWeek.tuesday.sixty_to_eighty,
                    agesOfTheWeek.wednesday.sixty_to_eighty,
                    agesOfTheWeek.thursday.sixty_to_eighty,
                    agesOfTheWeek.friday.sixty_to_eighty,
                    agesOfTheWeek.saturday.sixty_to_eighty,
                    agesOfTheWeek.sunday.sixty_to_eighty,
                ],
            });
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
                <div className="flex justify-center mt-16">
                    <span className="px-4 text-center text-1xl font-extrabold leading-none tracking-tight text-gray-dark md:text-2xl lg:text-3xl dark:text-white">{`Semana Nº ${DateTime.local().weekNumber} de ${today.getFullYear()}`}</span>
                </div>
                <div className="px-4 rounded-lg dark:border-gray-700 mt-6">
                    
                    <div className='relative p-6 w-full h-full bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                        {expressions ? 
                            <Area 
                                title="Expresiones detectadas"
                                labels={res.days} 
                                dataset={[

                                    {   
                                        label: 'Enojo',
                                        data: [
                                            expressions.angry[0],
                                            expressions.angry[1],
                                            expressions.angry[2],
                                            expressions.angry[3],
                                            expressions.angry[4],
                                            expressions.angry[5],
                                            expressions.angry[6],
                                        ],
                                        backgroundColor: [
                                            colors.background.enojo,
                                        ],
                                        borderColor: [
                                            colors.border.enojo,
                                        ]
                                    },
                                    {   
                                        label: 'Disgusto',
                                        data: [
                                            expressions.disgust[0],
                                            expressions.disgust[1],
                                            expressions.disgust[2],
                                            expressions.disgust[3],
                                            expressions.disgust[4],
                                            expressions.disgust[5],
                                            expressions.disgust[6],
                                        ],
                                        backgroundColor: [
                                            colors.background.disgusto,
                                        ],
                                        borderColor: [
                                            colors.border.disgusto,
                                        ]
                                    },
                                    {
                                        label: 'Miedo',
                                        data: [
                                            expressions.fear[0],
                                            expressions.fear[1],
                                            expressions.fear[2],
                                            expressions.fear[3],
                                            expressions.fear[4],
                                            expressions.fear[5],
                                            expressions.fear[6],
                                        ],
                                        backgroundColor: [
                                            colors.background.miedo,
                                        ],
                                        borderColor: [
                                            colors.border.miedo,
                                        ]
                                    },
                                    {
                                        label: 'Felicidad',
                                        data: [
                                            expressions.happy[0],
                                            expressions.happy[1],
                                            expressions.happy[2],
                                            expressions.happy[3],
                                            expressions.happy[4],
                                            expressions.happy[5],
                                            expressions.happy[6],
                                        ],
                                        backgroundColor: [
                                            colors.background.felicidad,
                                        ],
                                        borderColor: [
                                            colors.border.felicidad,
                                        ]
                                    },
                                    {
                                        label: 'Neutral',
                                        data: [
                                            expressions.neutral[0],
                                            expressions.neutral[1],
                                            expressions.neutral[2],
                                            expressions.neutral[3],
                                            expressions.neutral[4],
                                            expressions.neutral[5],
                                            expressions.neutral[6],
                                        ],
                                        backgroundColor: [
                                            colors.background.neutral,
                                        ],
                                        borderColor: [
                                            colors.border.neutral,
                                        ]
                                    },
                                    {
                                        label: 'Tristeza',
                                        data: [
                                            expressions.sad[0],
                                            expressions.sad[1],
                                            expressions.sad[2],
                                            expressions.sad[3],
                                            expressions.sad[4],
                                            expressions.sad[5],
                                            expressions.sad[6],
                                        ],
                                        backgroundColor: [
                                            colors.background.tristeza,
                                        ],
                                        borderColor: [
                                            colors.border.tristeza,
                                        ]
                                    },
                                    {
                                        label: 'Sorpresa',
                                        data: [
                                            expressions.surprise[0],
                                            expressions.surprise[1],
                                            expressions.surprise[2],
                                            expressions.surprise[3],
                                            expressions.surprise[4],
                                            expressions.surprise[5],
                                            expressions.surprise[6],
                                        ],
                                        backgroundColor: [
                                            colors.background.sorpresa,
                                        ],
                                        borderColor: [
                                            colors.border.sorpresa,
                                        ]
                                    }
                                    
                                ]}
                            /> :
                            <Area 
                                title="Expresiones detectadas"
                                labels={res.days} 
                                dataset={[

                                    {   
                                        label: 'Enojo',
                                        data: [],
                                        backgroundColor: [
                                            colors.background.enojo,
                                        ],
                                        borderColor: [
                                            colors.border.enojo,
                                        ]
                                    },
                                    {   
                                        label: 'Disgusto',
                                        data: [],
                                        backgroundColor: [
                                            colors.background.disgusto,
                                        ],
                                        borderColor: [
                                            colors.border.disgusto,
                                        ]
                                    },
                                    {
                                        label: 'Miedo',
                                        data: [],
                                        backgroundColor: [
                                            colors.background.miedo,
                                        ],
                                        borderColor: [
                                            colors.border.miedo,
                                        ]
                                    },
                                    {
                                        label: 'Felicidad',
                                        data: [],
                                        backgroundColor: [
                                            colors.background.felicidad,
                                        ],
                                        borderColor: [
                                            colors.border.felicidad,
                                        ]
                                    },
                                    {
                                        label: 'Neutral',
                                        data: [],
                                        backgroundColor: [
                                            colors.background.neutral,
                                        ],
                                        borderColor: [
                                            colors.border.neutral,
                                        ]
                                    },
                                    {
                                        label: 'Tristeza',
                                        data: [],
                                        backgroundColor: [
                                            colors.background.tristeza,
                                        ],
                                        borderColor: [
                                            colors.border.tristeza,
                                        ]
                                    },
                                    {
                                        label: 'Sorpresa',
                                        data: [],
                                        backgroundColor: [
                                            colors.background.sorpresa,
                                        ],
                                        borderColor: [
                                            colors.border.sorpresa,
                                        ]
                                    }
                                    
                                ]}
                            />   
                        }
                        
                    </div>

                    <div className='relative mt-4 p-6 w-full h-max bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                        {genders ?
                            <Area 
                                title="Generos detectados" 
                                labels={res.days} 
                                dataset={[
                                    {
                                        fill: true,
                                        label: 'M',
                                        data: [
                                            genders.male[0], 
                                            genders.male[1], 
                                            genders.male[2], 
                                            genders.male[3], 
                                            genders.male[4], 
                                            genders.male[5], 
                                            genders.male[6],
                                        ]
                                    },
                                    {
                                        fill: true,
                                        label: 'F',
                                        data: [
                                            genders.female[0], 
                                            genders.female[1], 
                                            genders.female[2], 
                                            genders.female[3], 
                                            genders.female[4], 
                                            genders.female[5], 
                                            genders.female[6],
                                        ],
                                    }
                                    
                                ]}
                            /> :
                            <Area 
                                title="Generos detectados" 
                                labels={res.days} 
                                dataset={[
                                    {
                                        fill: true,
                                        label: 'M',
                                        data: [],
                                    },
                                    {
                                        fill: true,
                                        label: 'F',
                                        data: [],
                                    }
                                    
                                ]}
                            />
                        }
                    </div>    
                    <div className='relative mt-4 p-6 w-full h-max bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                        {ages ?
                            <Area 
                                title="Edades detectadas" 
                                labels={res.days} 
                                dataset={[
                                    {
                                        label: '6-11',
                                        data: [
                                            ages.six_to_eleven[0], 
                                            ages.six_to_eleven[1], 
                                            ages.six_to_eleven[2], 
                                            ages.six_to_eleven[3], 
                                            ages.six_to_eleven[4], 
                                            ages.six_to_eleven[5], 
                                            ages.six_to_eleven[6],
                                        ],
                                    },
                                    {
                                        label: '12-18',
                                        data: [
                                            ages.twelve_to_eighteen[0], 
                                            ages.twelve_to_eighteen[1], 
                                            ages.twelve_to_eighteen[2], 
                                            ages.twelve_to_eighteen[3], 
                                            ages.twelve_to_eighteen[4], 
                                            ages.twelve_to_eighteen[5], 
                                            ages.twelve_to_eighteen[6],
                                        ],
                                    },
                                    {
                                        label: '19-26',
                                        data: [
                                            ages.nineteen_to_twentysix[0], 
                                            ages.nineteen_to_twentysix[1], 
                                            ages.nineteen_to_twentysix[2], 
                                            ages.nineteen_to_twentysix[3], 
                                            ages.nineteen_to_twentysix[4], 
                                            ages.nineteen_to_twentysix[5], 
                                            ages.nineteen_to_twentysix[6],
                                        ],
                                    },
                                    {
                                        label: '27-59',
                                        data: [
                                            ages.twentyseveven_to_fiftynine[0], 
                                            ages.twentyseveven_to_fiftynine[1], 
                                            ages.twentyseveven_to_fiftynine[2], 
                                            ages.twentyseveven_to_fiftynine[3], 
                                            ages.twentyseveven_to_fiftynine[4], 
                                            ages.twentyseveven_to_fiftynine[5], 
                                            ages.twentyseveven_to_fiftynine[6],
                                        ],
                                    },
                                    {
                                        label: '60-80',
                                        data: [
                                            ages.sixty_to_eighty[0], 
                                            ages.sixty_to_eighty[1], 
                                            ages.sixty_to_eighty[2], 
                                            ages.sixty_to_eighty[3], 
                                            ages.sixty_to_eighty[4], 
                                            ages.sixty_to_eighty[5], 
                                            ages.sixty_to_eighty[6],
                                        ],
                                    }
                                ]}
                            />:
                            <Area 
                                title="Edades detectadas" 
                                labels={res.days} 
                                dataset={[
                                    {
                                        label: '6-11',
                                        data: [],
                                    },
                                    {
                                        label: '12-18',
                                        data: [],
                                    },
                                    {
                                        label: '19-26',
                                        data: [],
                                    },
                                    {
                                        label: '27-59',
                                        data: [],
                                    },
                                    {
                                        label: '60-80',
                                        data: [],
                                    }
                                ]}
                            />
                        }
                    </div>                      
                </div>
                    
            </div>
        </div>
    )
}