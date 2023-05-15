
export const Input = ({type, placeholder, name, nameLabel, register, errors}) => {

    return (
        <div className="mb-6">
            <div className="mb-2">
                <label htmlFor= {name} className="block mb-2 text-sm font-medium text-white-custon dark:text-white">{nameLabel}</label>
                <input type={type} id={name} className="bg-gray-light border border-gray-light2 text-white-custon text-sm rounded focus:ring-green-light focus:green-light block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-light dark:focus:green-light" placeholder={placeholder} {...register }/>
            </div>
            {<span className="text-red-500">{errors?.message}</span>} 
        </div>
    );
};