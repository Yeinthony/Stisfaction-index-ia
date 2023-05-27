//Components
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar"; 
import { VerticalBar } from "../../components/charts/bars/VerticalBar";
import { HorizontalBar } from "../../components/charts/bars/HorizontalBar";
import { PieChart } from "../../components/charts/pie/pie";

//Others
import { Unfold } from "../../helpers/Unfold"; 
import { getDaysMonths } from "../../helpers/GetDaysMonths"; 


export function StatisticsDays() {

    const today = new Date();
    const res = getDaysMonths();
    
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
                            <PieChart 
                                title="Expresiones detectadas" 
                                labels={["Enojo", "Disgusto", "Miedo", "Felicidad", "Neutral", "Tristeza", "Sorpresa"]} 
                                dataset={[0.070, 0.0006, 0.0004, 76.43, 22.84, 0.14, 0.49]}
                            />
                        </div>

                        <div className="w-2/4 h-max ml-4">

                            <div className='relative p-6 w-full flex justify-center h-60 bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                                <HorizontalBar 
                                    title="Generos detectados" 
                                    labels={["M", "F"]} 
                                    dataset={[60, 40]}
                                />
                            </div>   

                            <div className='relative flex justify-center mt-4 p-6 w-full h-64 bg-white-custon-light border border-gray-200 rounded-lg shadow'>
                                <VerticalBar 
                                    title="Edades detectadas" 
                                    labels={["6-11", "12-18", "19-26", "27-59"]} 
                                    dataset={[10, 40, 35, 15]}
                                />
                            </div>      

                        </div>

                    </div>                   
                                                         
                </div>
                    
            </div>
        </div>
    )
}