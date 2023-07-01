
export const SecondarySpanInput = ({type, value, placeholder, name, nameLabel, spanIcon, register, errors}) => {

    return (
        <div className="mb-6">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-dark">{nameLabel}</label>
            <div className="mb-2 flex">
                <span className="inline-flex items-center px-3 text-sm text-white-custon-dark border-white-custon-dark  bg-gray-100 border border-white-custon-dark border-r-0 border-gray-300 rounded-l">
                    {spanIcon}
                </span>
                <input type={type} id={name} className="rounded-none rounded-r bg-gray-100 border border-whie-custon-dark text-gray-dark focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-light dark:focus:border-green-light" value={value} placeholder={placeholder} {...register}/>
            </div>
            {<span className="text-red-500">{errors.username?.message}</span>} 
        </div>
    );
};