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

export function StatisticsYear() {

    const today = new Date();
    const res = getDaysMonths();
    const colors = colorExpretions()
    
    const daysInTheMonth = [];

    const daysMonth = DateTime.local(today.getFullYear(), today.getMonth()).daysInMonth;

    //Load days in the month
    for (let i = -1; i < daysMonth; i++) { daysInTheMonth.push(i+2) }

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
                        <Area 
                            title="Expresiones detectadas"
                            labels={res.months} 
                            dataset={[

                                {   
                                    label: 'Enojo',
                                    data: [20, 24.36, 27, 10, 14.6, 45.36, 32.1, 24.5, 20.36, 22.5, 21.35, 23.50],
                                    backgroundColor: [
                                        colors.background.enojo,
                                    ],
                                    borderColor: [
                                        colors.border.enojo,
                                    ]
                                },
                                {   
                                    label: 'Disgusto',
                                    data: [15.2, 18.9, 20.8, 25.96, 22.5, 15.8, 4.5, 10.5, 7.6, 14, 16.65, 13],
                                    backgroundColor: [
                                        colors.background.disgusto,
                                    ],
                                    borderColor: [
                                        colors.border.disgusto,
                                    ]
                                },
                                {
                                    label: 'Miedo',
                                    data: [0.5, 1.5, 0.7, 2.4, 0.8, 1.4, 0.3, 0.7, 1, 1.3, 0.6, 1.4],
                                    backgroundColor: [
                                        colors.background.miedo,
                                    ],
                                    borderColor: [
                                        colors.border.miedo,
                                    ]
                                },
                                {
                                    label: 'Felicidad',
                                    data: [52, 68.3, 24.6, 67.36, 68.6, 80.5, 90.5, 75.6, 78.45, 82, 76.36, 81],
                                    backgroundColor: [
                                        colors.background.felicidad,
                                    ],
                                    borderColor: [
                                        colors.border.felicidad,
                                    ]
                                },
                                {
                                    label: 'Neutral',
                                    data: [56.36, 62.3, 75.6, 12.5, 26.8, 65.7, 85.6, 64.34, 65, 58.4, 73, 82.54],
                                    backgroundColor: [
                                        colors.background.neutral,
                                    ],
                                    borderColor: [
                                        colors.border.neutral,
                                    ]
                                },
                                {
                                    label: 'Tristeza',
                                    data: [4.5, 2.4, 5.7, 0.8, 1.8, 2.1, 2.7, 2.1, 1.8, 3, 3.7, 0.9],
                                    backgroundColor: [
                                        colors.background.tristeza,
                                    ],
                                    borderColor: [
                                        colors.border.tristeza,
                                    ]
                                },
                                {
                                    label: 'Sorpresa',
                                    data: [25.4, 32.7, 45.87, 35.6, 50.8, 43.9, 54.68, 45.65, 43, 59, 54.5, 43],
                                    backgroundColor: [
                                        colors.background.sorpresa,
                                    ],
                                    borderColor: [
                                        colors.border.sorpresa,
                                    ]
                                }
                                
                            ]}
                        />   
                    </div>

                    <div className='relative mt-4 p-6 w-full h-max bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                        <Area 
                            title="Generos detectados" 
                            labels={res.months} 
                            dataset={[
                                {
                                    fill: true,
                                    label: 'M',
                                    data: [25.4, 67.3, 53.87, 86.7, 62.46, 52.6, 35.32, 42.5, 35, 55.3, 32, 46],
                                },
                                {
                                    fill: true,
                                    label: 'F',
                                    data: [74.6, 32.7, 46.13, 13.3, 37.54, 47.4, 64.68, 57.5, 65, 45.7, 68, 54],
                                }
                                
                            ]}
                        />
                    </div>    
                    <div className='relative mt-4 p-6 w-full h-max bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                        <Area 
                            title="Edades detectadas" 
                            labels={res.months} 
                            dataset={[
                                {
                                    label: '6-11',
                                    data: [12.5, 10.8, 12.8, 7.5, 13.5, 5.9, 9.6, 5.4, 10, 12., 9.5, 11.3],
                                },
                                {
                                    label: '12-18',
                                    data: [15.9, 21.6, 84.5, 40.8, 25.6, 15, 16, 16, 17.5, 13, 15.7, 35],
                                },
                                {
                                    label: '19-26',
                                    data: [25.4, 67.3, 53.87, 86.7, 62.46, 52.6, 35.32, 45, 37.65, 50, 61.5, 64],
                                },
                                {
                                    label: '27-59',
                                    data: [74.6, 32.7, 46.13, 13.3, 37.54, 47.4, 64.68, 42, 35, 57, 65.5, 42],
                                }
                            ]}
                        />
                    </div>                      
                </div>
                    
            </div>
        </div>
    )
}