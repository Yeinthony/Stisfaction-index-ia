export function TablesDetections({expressions, genders, ages, day}){
    return(
        <div className="mt-12">
            <div className="flex justify-start">
                <span className="px-4 text-2xl font-bold tracking-wider leading-none tracking-tight text-gray-dark md:text-3xl lg:text-4xl dark:text-white">{day}</span>
            </div>
            <div className="lg:flex lg:justify-between mt-4 lg:mr-0 md:block mr-72">

                <div className="w-4/12 lg:mr-10 mx-auto relative border border-gray-200 rounded-md">
                    <table className="bg-blue-dark text-lg text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-lg text-gray-900 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Expresión
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Porcentaje
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Enojo
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {expressions.angry} %
                                </td>
                            </tr>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Disgusto
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {expressions.disgust} %
                                </td>
                            </tr>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Miedo
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {expressions.fear} %
                                </td>
                            </tr>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Felicidad
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {expressions.happy} %
                                </td>
                            </tr>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Neutral
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {expressions.neutral} %
                                </td>
                            </tr>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Tristeza
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {expressions.sad} %
                                </td>
                            </tr>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Sorpresa
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {expressions.surprise} %
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="w-4/12 relative mx-auto mt-4 lg:mt-0 border border-gray-200 rounded-md">
                    <table className="bg-blue-dark text-lg text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-lg text-gray-900 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Edad
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Porcentaje
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    6-11
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ages.six_to_eleven} %
                                </td>
                            </tr>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    12-18
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ages.twelve_to_eighteen} %
                                </td>
                            </tr>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    19-26
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ages.nineteen_to_twentysix} %
                                </td>
                            </tr>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    27-59
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ages.twentyseveven_to_fiftynine} %
                                </td>
                            </tr>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    60-80
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ages.sixty_to_eighty} %
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="w-4/12 relative mx-auto mt-4 lg:mt-0 border border-gray-200 rounded-md">
                    <table className="bg-blue-dark text-lg text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-lg text-gray-900 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Genero
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Porcentaje
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Masculino
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {genders.male} %
                                </td>
                            </tr>
                            <tr className="bg-white-custon-dark dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Femenino
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {genders.female} %
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    )
}