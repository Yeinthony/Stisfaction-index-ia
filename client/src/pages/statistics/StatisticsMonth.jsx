import { useEffect, useState } from 'react';

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
import { getExpressionsForMonth } from '../../api/expressions.api';
import { getGendersForMonth } from '../../api/genders.api';
import { getAgesForMonth } from '../../api/ages.api';
import { averagePorcentageAges, averagePorcentageExpressions, averagePorcentageGenders } from '../../helpers/AveragePorcentange';

export function StatisticsMonth() {

    const [expressions, setExpressions] = useState(false);
    const [genders, setGenders] = useState(false);
    const [ages, setAges] = useState(false);

    const today = new Date();
    const res = getDaysMonths();
    const colors = colorExpretions()
    const token = sessionStorage.getItem('token');
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

            const expressionsOfTheMonthWithAverageProcentage = {
                angry: [],
                disgust: [],
                fear: [],
                happy: [],
                neutral: [],
                sad: [],
                surprise: []
            }

            expressionsOfTheMonth.forEach(el => {
                expressionsOfTheMonthWithAverageProcentage.angry.push(el.angry);
                expressionsOfTheMonthWithAverageProcentage.disgust.push(el.disgust);
                expressionsOfTheMonthWithAverageProcentage.fear.push(el.fear);
                expressionsOfTheMonthWithAverageProcentage.happy.push(el.happy);
                expressionsOfTheMonthWithAverageProcentage.neutral.push(el.neutral);
                expressionsOfTheMonthWithAverageProcentage.sad.push(el.sad);
                expressionsOfTheMonthWithAverageProcentage.surprise.push(el.surprise);
            });

            setExpressions(expressionsOfTheMonthWithAverageProcentage);
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

            const gendersOfTheMonthWithAverageProcentage = {
                male: [],
                female: [],
            }

            gendersOfTheMonth.forEach(el => {
                gendersOfTheMonthWithAverageProcentage.male.push(el.male);
                gendersOfTheMonthWithAverageProcentage.female.push(el.female);
            });

            setGenders(gendersOfTheMonthWithAverageProcentage);
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

            const agesOfTheMonthWithAverageProcentage = {
                six_to_eleven: [],
                twelve_to_eighteen: [],
                nineteen_to_twentysix: [],
                twentyseveven_to_fiftynine: [],
                sixty_to_eighty: [],
            }

            agesOfTheMonth.forEach(el => {
                agesOfTheMonthWithAverageProcentage.six_to_eleven.push(el.six_to_eleven);
                agesOfTheMonthWithAverageProcentage.twelve_to_eighteen.push(el.twelve_to_eighteen);
                agesOfTheMonthWithAverageProcentage.nineteen_to_twentysix.push(el.nineteen_to_twentysix);
                agesOfTheMonthWithAverageProcentage.twentyseveven_to_fiftynine.push(el.twentyseveven_to_fiftynine);
                agesOfTheMonthWithAverageProcentage.sixty_to_eighty.push(el.sixty_to_eighty);
            });

            setAges(agesOfTheMonthWithAverageProcentage);
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
                <div className="flex justify-center mt-16">
                    <span className="px-4 text-center text-1xl font-extrabold leading-none tracking-tight text-gray-dark md:text-2xl lg:text-3xl dark:text-white">{`${res.months[month]} de ${year}`}</span>
                </div>
                <div className="px-4 rounded-lg dark:border-gray-700 mt-6">
                    
                    <div className='relative p-6 w-full h-full bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                        {expressions ? 
                            <Area 
                                title="Expresiones detectadas"
                                labels={daysInTheMonth} 
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
                                            expressions.angry[12],
                                            expressions.angry[13],
                                            expressions.angry[14],
                                            expressions.angry[15],
                                            expressions.angry[16],
                                            expressions.angry[17],
                                            expressions.angry[18],
                                            expressions.angry[19],
                                            expressions.angry[20],
                                            expressions.angry[21],
                                            expressions.angry[22],
                                            expressions.angry[23],
                                            expressions.angry[24],
                                            expressions.angry[25],
                                            expressions.angry[26],
                                            expressions.angry[27] ? expressions.angry[27]: "",
                                            expressions.angry[28] ? expressions.angry[28]: "",
                                            expressions.angry[29] ? expressions.angry[29]: "",
                                            expressions.angry[30] ? expressions.angry[30]: "",
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
                                            expressions.disgust[12],
                                            expressions.disgust[13],
                                            expressions.disgust[14],
                                            expressions.disgust[15],
                                            expressions.disgust[16],
                                            expressions.disgust[17],
                                            expressions.disgust[18],
                                            expressions.disgust[19],
                                            expressions.disgust[20],
                                            expressions.disgust[21],
                                            expressions.disgust[22],
                                            expressions.disgust[23],
                                            expressions.disgust[24],
                                            expressions.disgust[25],
                                            expressions.disgust[26],
                                            expressions.disgust[27] ? expressions.disgust[27]: "",
                                            expressions.disgust[28] ? expressions.disgust[28]: "",
                                            expressions.disgust[29] ? expressions.disgust[29]: "",
                                            expressions.disgust[30] ? expressions.disgust[30]: "",
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
                                            expressions.fear[12],
                                            expressions.fear[13],
                                            expressions.fear[14],
                                            expressions.fear[15],
                                            expressions.fear[16],
                                            expressions.fear[17],
                                            expressions.fear[18],
                                            expressions.fear[19],
                                            expressions.fear[20],
                                            expressions.fear[21],
                                            expressions.fear[22],
                                            expressions.fear[23],
                                            expressions.fear[24],
                                            expressions.fear[25],
                                            expressions.fear[26],
                                            expressions.fear[27] ? expressions.fear[27]: "",
                                            expressions.fear[28] ? expressions.fear[28]: "",
                                            expressions.fear[29] ? expressions.fear[29]: "",
                                            expressions.fear[30] ? expressions.fear[30]: "",
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
                                            expressions.happy[12],
                                            expressions.happy[13],
                                            expressions.happy[14],
                                            expressions.happy[15],
                                            expressions.happy[16],
                                            expressions.happy[17],
                                            expressions.happy[18],
                                            expressions.happy[19],
                                            expressions.happy[20],
                                            expressions.happy[21],
                                            expressions.happy[22],
                                            expressions.happy[23],
                                            expressions.happy[24],
                                            expressions.happy[25],
                                            expressions.happy[26],
                                            expressions.happy[27] ? expressions.happy[27]: "",
                                            expressions.happy[28] ? expressions.happy[28]: "",
                                            expressions.happy[29] ? expressions.happy[29]: "",
                                            expressions.happy[30] ? expressions.happy[30]: "",
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
                                            expressions.neutral[12],
                                            expressions.neutral[13],
                                            expressions.neutral[14],
                                            expressions.neutral[15],
                                            expressions.neutral[16],
                                            expressions.neutral[17],
                                            expressions.neutral[18],
                                            expressions.neutral[19],
                                            expressions.neutral[20],
                                            expressions.neutral[21],
                                            expressions.neutral[22],
                                            expressions.neutral[23],
                                            expressions.neutral[24],
                                            expressions.neutral[25],
                                            expressions.neutral[26],
                                            expressions.neutral[27] ? expressions.neutral[27]: "",
                                            expressions.neutral[28] ? expressions.neutral[28]: "",
                                            expressions.neutral[29] ? expressions.neutral[29]: "",
                                            expressions.neutral[30] ? expressions.neutral[30]: "",
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
                                            expressions.sad[12],
                                            expressions.sad[13],
                                            expressions.sad[14],
                                            expressions.sad[15],
                                            expressions.sad[16],
                                            expressions.sad[17],
                                            expressions.sad[18],
                                            expressions.sad[19],
                                            expressions.sad[20],
                                            expressions.sad[21],
                                            expressions.sad[22],
                                            expressions.sad[23],
                                            expressions.sad[24],
                                            expressions.sad[25],
                                            expressions.sad[26],
                                            expressions.sad[27] ? expressions.sad[27]: "",
                                            expressions.sad[28] ? expressions.sad[28]: "",
                                            expressions.sad[29] ? expressions.sad[29]: "",
                                            expressions.sad[30] ? expressions.sad[30]: "",
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
                                            expressions.surprise[12],
                                            expressions.surprise[13],
                                            expressions.surprise[14],
                                            expressions.surprise[15],
                                            expressions.surprise[16],
                                            expressions.surprise[17],
                                            expressions.surprise[18],
                                            expressions.surprise[19],
                                            expressions.surprise[20],
                                            expressions.surprise[21],
                                            expressions.surprise[22],
                                            expressions.surprise[23],
                                            expressions.surprise[24],
                                            expressions.surprise[25],
                                            expressions.surprise[26],
                                            expressions.surprise[27] ? expressions.surprise[27]: "",
                                            expressions.surprise[28] ? expressions.surprise[28]: "",
                                            expressions.surprise[29] ? expressions.surprise[29]: "",
                                            expressions.surprise[30] ? expressions.surprise[30]: "",
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
                                labels={daysInTheMonth} 
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
                                labels={daysInTheMonth} 
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
                                            genders.male[12],
                                            genders.male[13],
                                            genders.male[14],
                                            genders.male[15],
                                            genders.male[16],
                                            genders.male[17],
                                            genders.male[18],
                                            genders.male[19],
                                            genders.male[20],
                                            genders.male[21],
                                            genders.male[22],
                                            genders.male[23],
                                            genders.male[24],
                                            genders.male[25],
                                            genders.male[26],
                                            genders.male[27] ?genders.male[27]: "",
                                            genders.male[28] ?genders.male[28]: "",
                                            genders.male[29] ?genders.male[29]: "",
                                            genders.male[30] ?genders.male[30]: "",
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
                                            genders.female[12],
                                            genders.female[13],
                                            genders.female[14],
                                            genders.female[15],
                                            genders.female[16],
                                            genders.female[17],
                                            genders.female[18],
                                            genders.female[19],
                                            genders.female[20],
                                            genders.female[21],
                                            genders.female[22],
                                            genders.female[23],
                                            genders.female[24],
                                            genders.female[25],
                                            genders.female[26],
                                            genders.female[27] ?genders.female[27]: "",
                                            genders.female[28] ?genders.female[28]: "",
                                            genders.female[29] ?genders.female[29]: "",
                                            genders.female[30] ?genders.female[30]: "",
                                        ],
                                    }
                                    
                                ]}
                            /> :
                            <Area 
                                title="Generos detectados" 
                                labels={daysInTheMonth} 
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
                                labels={daysInTheMonth} 
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
                                            ages.six_to_eleven[12],
                                            ages.six_to_eleven[13],
                                            ages.six_to_eleven[14],
                                            ages.six_to_eleven[15],
                                            ages.six_to_eleven[16],
                                            ages.six_to_eleven[17],
                                            ages.six_to_eleven[18],
                                            ages.six_to_eleven[19],
                                            ages.six_to_eleven[20],
                                            ages.six_to_eleven[21],
                                            ages.six_to_eleven[22],
                                            ages.six_to_eleven[23],
                                            ages.six_to_eleven[24],
                                            ages.six_to_eleven[25],
                                            ages.six_to_eleven[26],
                                            ages.six_to_eleven[27] ?ages.six_to_eleven[27]: "",
                                            ages.six_to_eleven[28] ?ages.six_to_eleven[28]: "",
                                            ages.six_to_eleven[29] ?ages.six_to_eleven[29]: "",
                                            ages.six_to_eleven[30] ?ages.six_to_eleven[30]: "",
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
                                            ages.twelve_to_eighteen[12],
                                            ages.twelve_to_eighteen[13],
                                            ages.twelve_to_eighteen[14],
                                            ages.twelve_to_eighteen[15],
                                            ages.twelve_to_eighteen[16],
                                            ages.twelve_to_eighteen[17],
                                            ages.twelve_to_eighteen[18],
                                            ages.twelve_to_eighteen[19],
                                            ages.twelve_to_eighteen[20],
                                            ages.twelve_to_eighteen[21],
                                            ages.twelve_to_eighteen[22],
                                            ages.twelve_to_eighteen[23],
                                            ages.twelve_to_eighteen[24],
                                            ages.twelve_to_eighteen[25],
                                            ages.twelve_to_eighteen[26],
                                            ages.twelve_to_eighteen[27] ?ages.twelve_to_eighteen[27]: "",
                                            ages.twelve_to_eighteen[28] ?ages.twelve_to_eighteen[28]: "",
                                            ages.twelve_to_eighteen[29] ?ages.twelve_to_eighteen[29]: "",
                                            ages.twelve_to_eighteen[30] ?ages.twelve_to_eighteen[30]: "",
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
                                            ages.nineteen_to_twentysix[12],
                                            ages.nineteen_to_twentysix[13],
                                            ages.nineteen_to_twentysix[14],
                                            ages.nineteen_to_twentysix[15],
                                            ages.nineteen_to_twentysix[16],
                                            ages.nineteen_to_twentysix[17],
                                            ages.nineteen_to_twentysix[18],
                                            ages.nineteen_to_twentysix[19],
                                            ages.nineteen_to_twentysix[20],
                                            ages.nineteen_to_twentysix[21],
                                            ages.nineteen_to_twentysix[22],
                                            ages.nineteen_to_twentysix[23],
                                            ages.nineteen_to_twentysix[24],
                                            ages.nineteen_to_twentysix[25],
                                            ages.nineteen_to_twentysix[26],
                                            ages.nineteen_to_twentysix[27] ?ages.nineteen_to_twentysix[27]: "",
                                            ages.nineteen_to_twentysix[28] ?ages.nineteen_to_twentysix[28]: "",
                                            ages.nineteen_to_twentysix[29] ?ages.nineteen_to_twentysix[29]: "",
                                            ages.nineteen_to_twentysix[30] ?ages.nineteen_to_twentysix[30]: "",
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
                                            ages.twentyseveven_to_fiftynine[12],
                                            ages.twentyseveven_to_fiftynine[13],
                                            ages.twentyseveven_to_fiftynine[14],
                                            ages.twentyseveven_to_fiftynine[15],
                                            ages.twentyseveven_to_fiftynine[16],
                                            ages.twentyseveven_to_fiftynine[17],
                                            ages.twentyseveven_to_fiftynine[18],
                                            ages.twentyseveven_to_fiftynine[19],
                                            ages.twentyseveven_to_fiftynine[20],
                                            ages.twentyseveven_to_fiftynine[21],
                                            ages.twentyseveven_to_fiftynine[22],
                                            ages.twentyseveven_to_fiftynine[23],
                                            ages.twentyseveven_to_fiftynine[24],
                                            ages.twentyseveven_to_fiftynine[25],
                                            ages.twentyseveven_to_fiftynine[26],
                                            ages.twentyseveven_to_fiftynine[27] ?ages.twentyseveven_to_fiftynine[27]: "",
                                            ages.twentyseveven_to_fiftynine[28] ?ages.twentyseveven_to_fiftynine[28]: "",
                                            ages.twentyseveven_to_fiftynine[29] ?ages.twentyseveven_to_fiftynine[29]: "",
                                            ages.twentyseveven_to_fiftynine[30] ?ages.twentyseveven_to_fiftynine[30]: "",
                                        ],
                                    },
                                    {
                                        label: '27-59',
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
                                            ages.sixty_to_eighty[12],
                                            ages.sixty_to_eighty[13],
                                            ages.sixty_to_eighty[14],
                                            ages.sixty_to_eighty[15],
                                            ages.sixty_to_eighty[16],
                                            ages.sixty_to_eighty[17],
                                            ages.sixty_to_eighty[18],
                                            ages.sixty_to_eighty[19],
                                            ages.sixty_to_eighty[20],
                                            ages.sixty_to_eighty[21],
                                            ages.sixty_to_eighty[22],
                                            ages.sixty_to_eighty[23],
                                            ages.sixty_to_eighty[24],
                                            ages.sixty_to_eighty[25],
                                            ages.sixty_to_eighty[26],
                                            ages.sixty_to_eighty[27] ?ages.sixty_to_eighty[27]: "",
                                            ages.sixty_to_eighty[28] ?ages.sixty_to_eighty[28]: "",
                                            ages.sixty_to_eighty[29] ?ages.sixty_to_eighty[29]: "",
                                            ages.sixty_to_eighty[30] ?ages.sixty_to_eighty[30]: "",
                                        ],
                                    }
                                ]}
                            /> :
                            <Area 
                            title="Edades detectadas" 
                            labels={daysInTheMonth} 
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