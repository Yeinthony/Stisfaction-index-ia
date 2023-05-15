
export function Toast(){

    const unfoldToast = () =>{
        const $dropdownToast = document.getElementById('toast-success');  

        //Despliega el toast
        $dropdownToast.classList.remove('-translate-y-full', 'top-0');
        $dropdownToast.classList.add('translate-y-0', 'top-12');

        setTimeout(() => {
            //Oculta el toast
            $dropdownToast.classList.add('-translate-y-full', 'top-0');
            $dropdownToast.classList.remove('translate-y-0', 'top-12');
        }, 4000);
       
    }

    setTimeout(() => {
        unfoldToast();
    }, 1000);

    return (

        <div id="toast-success" className="fixed top-0 left-0 right-0 mx-auto z-40 w-full transition-transform -translate-y-full flex items-center max-w-xs p-4 mb-4 text-white-custon bg-gray-light rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg aria-hidden="true" className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Check icon</span>
            </div>
            <div className="mx-auto text-md text-center font-normal">
                <p>Usuario registrado con exito.</p>
                <p>Redirigiendo al Login...</p>
            </div>
        </div>
    )
}

