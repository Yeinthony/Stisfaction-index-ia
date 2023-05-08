
export const ButtonForm = ({name}) => {
    return (
        <div>
            <button type="submit" className="text-gray white bg-blue hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{name}</button>
        </div>
    );
}


