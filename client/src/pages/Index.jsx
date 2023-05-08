import { SecondaryNavbar } from "../components/SecondaryNavbar";

export function Index() {
    return (
        <div className="bg-gray-dark h-screen">
            <SecondaryNavbar/>
            <section className="">
                <div className="mx-16">
                    <div className="w-7/12 mt-28 p-6 rounded-lg dark:bg-gray-800 dark:border-gray-700">

                        <h1 className="mb-4 text-3xl font-extrabold text-white-custon dark:text-white md:text-5xl lg:text-6xl">Indice de <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-light from-blue">Satisfacción.</span></h1>
                        <p className="text-lg font-normal text-gray-light2 lg:text-xl dark:text-white-custom">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus rerum amet harum cumque facilis libero a. Quos et alias quas odio. Tempore, necessitatibus alias! Quia deleniti ipsam ut delectus rem?
                        Accusamus tempora iure corrupti aut.</p>
                        
                        <a href="#" className="mt-8 inline-flex items-center px-3 py-2 text-lg font-medium text-center text-gray bg-blue rounded-lg hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>

                </div>
            </section>
        </div>
    );
}