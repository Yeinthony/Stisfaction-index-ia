import { useEffect, useState } from "react";

//Components
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar"; 
import { Area } from "../../components/charts/area/Area"; 

//Others
import { Unfold } from "../../helpers/Unfold"; 
import { getDaysMonths } from "../../helpers/GetDaysMonths"; 
import { colorExpretions } from '../../helpers/ColorsExpretions';
import { averagePorcentageAges, averagePorcentageExpressions, averagePorcentageGenders } from "../../helpers/AveragePorcentange";
import { getExpressionsForYear } from "../../api/expressions.api";
import { getAgesForYear } from "../../api/ages.api";
import { getGendersForYear } from "../../api/genders.api";

export function StatisticsYear() {

    const [expressions, setExpressions] = useState(false);
    const [genders, setGenders] = useState(false);
    const [ages, setAges] = useState(false);

    const today = new Date();
    const res = getDaysMonths();
    const colors = colorExpretions()
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

            setExpressions({
                angry: [
                    expressionsOfTheYear.january.angry,
                    expressionsOfTheYear.february.angry,
                    expressionsOfTheYear.march.angry,
                    expressionsOfTheYear.april.angry,
                    expressionsOfTheYear.may.angry,
                    expressionsOfTheYear.june.angry,
                    expressionsOfTheYear.july.angry,
                    expressionsOfTheYear.august.angry,
                    expressionsOfTheYear.september.angry,
                    expressionsOfTheYear.octuber.angry,
                    expressionsOfTheYear.november.angry,
                    expressionsOfTheYear.december.angry,
                ],
                disgust: [
                    expressionsOfTheYear.january.disgust,
                    expressionsOfTheYear.february.disgust,
                    expressionsOfTheYear.march.disgust,
                    expressionsOfTheYear.april.disgust,
                    expressionsOfTheYear.may.disgust,
                    expressionsOfTheYear.june.disgust,
                    expressionsOfTheYear.july.disgust,
                    expressionsOfTheYear.august.disgust,
                    expressionsOfTheYear.september.disgust,
                    expressionsOfTheYear.octuber.disgust,
                    expressionsOfTheYear.november.disgust,
                    expressionsOfTheYear.december.disgust,
                ],
                fear: [
                    expressionsOfTheYear.january.fear,
                    expressionsOfTheYear.february.fear,
                    expressionsOfTheYear.march.fear,
                    expressionsOfTheYear.april.fear,
                    expressionsOfTheYear.may.fear,
                    expressionsOfTheYear.june.fear,
                    expressionsOfTheYear.july.fear,
                    expressionsOfTheYear.august.fear,
                    expressionsOfTheYear.september.fear,
                    expressionsOfTheYear.octuber.fear,
                    expressionsOfTheYear.november.fear,
                    expressionsOfTheYear.december.fear,
                ],
                happy: [
                    expressionsOfTheYear.january.happy,
                    expressionsOfTheYear.february.happy,
                    expressionsOfTheYear.march.happy,
                    expressionsOfTheYear.april.happy,
                    expressionsOfTheYear.may.happy,
                    expressionsOfTheYear.june.happy,
                    expressionsOfTheYear.july.happy,
                    expressionsOfTheYear.august.happy,
                    expressionsOfTheYear.september.happy,
                    expressionsOfTheYear.octuber.happy,
                    expressionsOfTheYear.november.happy,
                    expressionsOfTheYear.december.happy,
                ],
                neutral: [
                    expressionsOfTheYear.january.neutral,
                    expressionsOfTheYear.february.neutral,
                    expressionsOfTheYear.march.neutral,
                    expressionsOfTheYear.april.neutral,
                    expressionsOfTheYear.may.neutral,
                    expressionsOfTheYear.june.neutral,
                    expressionsOfTheYear.july.neutral,
                    expressionsOfTheYear.august.neutral,
                    expressionsOfTheYear.september.neutral,
                    expressionsOfTheYear.octuber.neutral,
                    expressionsOfTheYear.november.neutral,
                    expressionsOfTheYear.december.neutral,
                ],
                sad: [
                    expressionsOfTheYear.january.sad,
                    expressionsOfTheYear.february.sad,
                    expressionsOfTheYear.march.sad,
                    expressionsOfTheYear.april.sad,
                    expressionsOfTheYear.may.sad,
                    expressionsOfTheYear.june.sad,
                    expressionsOfTheYear.july.sad,
                    expressionsOfTheYear.august.sad,
                    expressionsOfTheYear.september.sad,
                    expressionsOfTheYear.octuber.sad,
                    expressionsOfTheYear.november.sad,
                    expressionsOfTheYear.december.sad,
                ],
                surprise: [
                    expressionsOfTheYear.january.surprise,
                    expressionsOfTheYear.february.surprise,
                    expressionsOfTheYear.march.surprise,
                    expressionsOfTheYear.april.surprise,
                    expressionsOfTheYear.may.surprise,
                    expressionsOfTheYear.june.surprise,
                    expressionsOfTheYear.july.surprise,
                    expressionsOfTheYear.august.surprise,
                    expressionsOfTheYear.september.surprise,
                    expressionsOfTheYear.octuber.surprise,
                    expressionsOfTheYear.november.surprise,
                    expressionsOfTheYear.december.surprise,
                ]
            });
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

            setGenders({
                male: [
                    gendersOfTheYear.january.male,
                    gendersOfTheYear.february.male,
                    gendersOfTheYear.march.male,
                    gendersOfTheYear.april.male,
                    gendersOfTheYear.may.male,
                    gendersOfTheYear.june.male,
                    gendersOfTheYear.july.male,
                    gendersOfTheYear.august.male,
                    gendersOfTheYear.september.male,
                    gendersOfTheYear.octuber.male,
                    gendersOfTheYear.november.male,
                    gendersOfTheYear.december.male,
                ],
                female: [
                    gendersOfTheYear.january.female,
                    gendersOfTheYear.february.female,
                    gendersOfTheYear.march.female,
                    gendersOfTheYear.april.female,
                    gendersOfTheYear.may.female,
                    gendersOfTheYear.june.female,
                    gendersOfTheYear.july.female,
                    gendersOfTheYear.august.female,
                    gendersOfTheYear.september.female,
                    gendersOfTheYear.octuber.female,
                    gendersOfTheYear.november.female,
                    gendersOfTheYear.december.female,
                ]
            });
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

            setAges({
                six_to_eleven: [
                    agesOfTheYear.january.six_to_eleven,
                    agesOfTheYear.february.six_to_eleven,
                    agesOfTheYear.march.six_to_eleven,
                    agesOfTheYear.april.six_to_eleven,
                    agesOfTheYear.may.six_to_eleven,
                    agesOfTheYear.june.six_to_eleven,
                    agesOfTheYear.july.six_to_eleven,
                    agesOfTheYear.august.six_to_eleven,
                    agesOfTheYear.september.six_to_eleven,
                    agesOfTheYear.octuber.six_to_eleven,
                    agesOfTheYear.november.six_to_eleven,
                    agesOfTheYear.december.six_to_eleven,
                ],
                twelve_to_eighteen: [
                    agesOfTheYear.january.twelve_to_eighteen,
                    agesOfTheYear.february.twelve_to_eighteen,
                    agesOfTheYear.march.twelve_to_eighteen,
                    agesOfTheYear.april.twelve_to_eighteen,
                    agesOfTheYear.may.twelve_to_eighteen,
                    agesOfTheYear.june.twelve_to_eighteen,
                    agesOfTheYear.july.twelve_to_eighteen,
                    agesOfTheYear.august.twelve_to_eighteen,
                    agesOfTheYear.september.twelve_to_eighteen,
                    agesOfTheYear.octuber.twelve_to_eighteen,
                    agesOfTheYear.november.twelve_to_eighteen,
                    agesOfTheYear.december.twelve_to_eighteen,
                ],
                nineteen_to_twentysix: [
                    agesOfTheYear.january.nineteen_to_twentysix,
                    agesOfTheYear.february.nineteen_to_twentysix,
                    agesOfTheYear.march.nineteen_to_twentysix,
                    agesOfTheYear.april.nineteen_to_twentysix,
                    agesOfTheYear.may.nineteen_to_twentysix,
                    agesOfTheYear.june.nineteen_to_twentysix,
                    agesOfTheYear.july.nineteen_to_twentysix,
                    agesOfTheYear.august.nineteen_to_twentysix,
                    agesOfTheYear.september.nineteen_to_twentysix,
                    agesOfTheYear.octuber.nineteen_to_twentysix,
                    agesOfTheYear.november.nineteen_to_twentysix,
                    agesOfTheYear.december.nineteen_to_twentysix,
                ],
                twentyseveven_to_fiftynine: [
                    agesOfTheYear.january.twentyseveven_to_fiftynine,
                    agesOfTheYear.february.twentyseveven_to_fiftynine,
                    agesOfTheYear.march.twentyseveven_to_fiftynine,
                    agesOfTheYear.april.twentyseveven_to_fiftynine,
                    agesOfTheYear.may.twentyseveven_to_fiftynine,
                    agesOfTheYear.june.twentyseveven_to_fiftynine,
                    agesOfTheYear.july.twentyseveven_to_fiftynine,
                    agesOfTheYear.august.twentyseveven_to_fiftynine,
                    agesOfTheYear.september.twentyseveven_to_fiftynine,
                    agesOfTheYear.octuber.twentyseveven_to_fiftynine,
                    agesOfTheYear.november.twentyseveven_to_fiftynine,
                    agesOfTheYear.december.twentyseveven_to_fiftynine,
                ],
                sixty_to_eighty: [
                    agesOfTheYear.january.sixty_to_eighty,
                    agesOfTheYear.february.sixty_to_eighty,
                    agesOfTheYear.march.sixty_to_eighty,
                    agesOfTheYear.april.sixty_to_eighty,
                    agesOfTheYear.may.sixty_to_eighty,
                    agesOfTheYear.june.sixty_to_eighty,
                    agesOfTheYear.july.sixty_to_eighty,
                    agesOfTheYear.august.sixty_to_eighty,
                    agesOfTheYear.september.sixty_to_eighty,
                    agesOfTheYear.octuber.sixty_to_eighty,
                    agesOfTheYear.november.sixty_to_eighty,
                    agesOfTheYear.december.sixty_to_eighty,
                ],
            });
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
                <div className="flex justify-center mt-16">
                    <span className="px-4 text-center text-1xl font-extrabold leading-none tracking-tight text-gray-dark md:text-2xl lg:text-3xl dark:text-white">{`${today.getFullYear()}`}</span>
                </div>
                <div className="px-4 rounded-lg dark:border-gray-700 mt-6">
                    
                    <div className='relative p-6 w-full h-full bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                        {expressions ? 
                            <Area 
                                title="Expresiones detectadas"
                                labels={res.months} 
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
                                            expressions.angry[7],
                                            expressions.angry[8],
                                            expressions.angry[9],
                                            expressions.angry[10],
                                            expressions.angry[11],
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
                                            expressions.disgust[7],
                                            expressions.disgust[8],
                                            expressions.disgust[9],
                                            expressions.disgust[10],
                                            expressions.disgust[11],
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
                                            expressions.fear[7],
                                            expressions.fear[8],
                                            expressions.fear[9],
                                            expressions.fear[10],
                                            expressions.fear[11],
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
                                            expressions.happy[7],
                                            expressions.happy[8],
                                            expressions.happy[9],
                                            expressions.happy[10],
                                            expressions.happy[11],
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
                                            expressions.neutral[7],
                                            expressions.neutral[8],
                                            expressions.neutral[9],
                                            expressions.neutral[10],
                                            expressions.neutral[11],
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
                                            expressions.sad[7],
                                            expressions.sad[8],
                                            expressions.sad[9],
                                            expressions.sad[10],
                                            expressions.sad[11],
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
                                            expressions.surprise[7],
                                            expressions.surprise[8],
                                            expressions.surprise[9],
                                            expressions.surprise[10],
                                            expressions.surprise[11],
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
                                labels={res.months} 
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
                                labels={res.months} 
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
                                            genders.male[7],
                                            genders.male[8],
                                            genders.male[9],
                                            genders.male[10],
                                            genders.male[11],
                                        ],
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
                                            genders.female[7],
                                            genders.female[8],
                                            genders.female[9],
                                            genders.female[10],
                                            genders.female[11],
                                        ],
                                    }
                                    
                                ]}
                            /> :
                            <Area 
                                title="Generos detectados" 
                                labels={res.months} 
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
                                labels={res.months} 
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
                                            ages.six_to_eleven[7],
                                            ages.six_to_eleven[8],
                                            ages.six_to_eleven[9],
                                            ages.six_to_eleven[10],
                                            ages.six_to_eleven[11],
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
                                            ages.twelve_to_eighteen[7],
                                            ages.twelve_to_eighteen[8],
                                            ages.twelve_to_eighteen[9],
                                            ages.twelve_to_eighteen[10],
                                            ages.twelve_to_eighteen[11],
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
                                            ages.nineteen_to_twentysix[7],
                                            ages.nineteen_to_twentysix[8],
                                            ages.nineteen_to_twentysix[9],
                                            ages.nineteen_to_twentysix[10],
                                            ages.nineteen_to_twentysix[11],
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
                                            ages.twentyseveven_to_fiftynine[7],
                                            ages.twentyseveven_to_fiftynine[8],
                                            ages.twentyseveven_to_fiftynine[9],
                                            ages.twentyseveven_to_fiftynine[10],
                                            ages.twentyseveven_to_fiftynine[11],
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
                                            ages.sixty_to_eighty[7],
                                            ages.sixty_to_eighty[8],
                                            ages.sixty_to_eighty[9],
                                            ages.sixty_to_eighty[10],
                                            ages.sixty_to_eighty[11],
                                        ],
                                    }
                                ]}
                            /> :
                            <Area 
                                title="Edades detectadas" 
                                labels={res.months} 
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