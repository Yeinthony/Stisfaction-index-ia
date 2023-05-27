export const Button = ({name, handlePlay}) => {
    return (
        <>
            <button type="button" onClick={handlePlay} className="text-gray hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-5xl w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{name}</button>
        </>
    );
}
