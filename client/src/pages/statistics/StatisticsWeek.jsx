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


export function StatisticsWeek() {

    const today = new Date();
    const res = getDaysMonths();
    const colors = colorExpretions()
  
    
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
                        <Area 
                            title="Expresiones detectadas"
                            labels={res.days} 
                            dataset={[

                                {   
                                    label: 'Enojo',
                                    data: [20, 24.36, 27, 10, 14.6, 45.36, 32.1],
                                    backgroundColor: [
                                        colors.background.enojo,
                                    ],
                                    borderColor: [
                                        colors.border.enojo,
                                    ]
                                },
                                {   
                                    label: 'Disgusto',
                                    data: [15.2, 18.9, 20.8, 25.96, 22.5, 15.8, 4.5],
                                    backgroundColor: [
                                        colors.background.disgusto,
                                    ],
                                    borderColor: [
                                        colors.border.disgusto,
                                    ]
                                },
                                {
                                    label: 'Miedo',
                                    data: [0.5, 1.5, 0.7, 2.4, 0.8, 1.4, 0.3],
                                    backgroundColor: [
                                        colors.background.miedo,
                                    ],
                                    borderColor: [
                                        colors.border.miedo,
                                    ]
                                },
                                {
                                    label: 'Felicidad',
                                    data: [52, 68.3, 24.6, 67.36, 68.6, 80.5, 90.5],
                                    backgroundColor: [
                                        colors.background.felicidad,
                                    ],
                                    borderColor: [
                                        colors.border.felicidad,
                                    ]
                                },
                                {
                                    label: 'Neutral',
                                    data: [56.36, 62.3, 75.6, 12.5, 26.8, 65.7, 85.6],
                                    backgroundColor: [
                                        colors.background.neutral,
                                    ],
                                    borderColor: [
                                        colors.border.neutral,
                                    ]
                                },
                                {
                                    label: 'Tristeza',
                                    data: [4.5, 2.4, 5.7, 0.8, 1.8, 2.1, 2.7],
                                    backgroundColor: [
                                        colors.background.tristeza,
                                    ],
                                    borderColor: [
                                        colors.border.tristeza,
                                    ]
                                },
                                {
                                    label: 'Sorpresa',
                                    data: [25.4, 32.7, 45.87, 35.6, 50.8, 43.9, 54.68],
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
                            labels={res.days} 
                            dataset={[
                                {
                                    fill: true,
                                    label: 'M',
                                    data: [25.4, 67.3, 53.87, 86.7, 62.46, 52.6, 35.32],
                                },
                                {
                                    fill: true,
                                    label: 'F',
                                    data: [74.6, 32.7, 46.13, 13.3, 37.54, 47.4, 64.68],
                                }
                                
                            ]}
                        />
                    </div>    
                    <div className='relative mt-4 p-6 w-full h-max bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                        <Area 
                            title="Edades detectadas" 
                            labels={res.days} 
                            dataset={[
                                {
                                    label: '6-11',
                                    data: [12.5, 10.8, 12.8, 7.5, 13.5, 5.9, 9.6],
                                },
                                {
                                    label: '12-18',
                                    data: [15.9, 21.6, 84.5, 40.8, 25.6, 15, 16],
                                },
                                {
                                    label: '19-26',
                                    data: [25.4, 67.3, 53.87, 86.7, 62.46, 52.6, 35.32],
                                },
                                {
                                    label: '27-59',
                                    data: [74.6, 32.7, 46.13, 13.3, 37.54, 47.4, 64.68],
                                }
                            ]}
                        />
                    </div>                      
                </div>
                    
            </div>
        </div>
    )
}