

export const SpanInput = ({type, placeholder, name, nameLabel, spanIcon, register}) => {

    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-white-custon dark:text-white">{nameLabel}</label>
            <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-light2 bg-gray-light border border-gray-light2 border-r-0 border-gray-300 rounded-l dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    {spanIcon}
                </span>
                <input type={type} id={name} className="rounded-none rounded-r bg-gray-light border border-gray-light2 text-white-custon focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-light dark:focus:border-green-light" placeholder={placeholder} {...register}/>
            </div>
        </div>
    );
};