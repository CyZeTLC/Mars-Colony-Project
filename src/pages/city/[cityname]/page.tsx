import { useParams } from 'react-router-dom';
import { RessourcesChart } from '@/components/dashboard/RessourcesChart';

const City = () => {
    const { name } = useParams();

    return (
        <section>
            <h3 className="text-2xl font-semibold text-mars-accent mb-4">{name}</h3>
            <div className='bg-secondary p-6 rounded-lg border border-gray-700 shadow-lg grid grid-cols-2 gap-6'>
                <div className="border-r border-r-gray-700 pr-6">
                    <img src="https://www.businessinsider.de/wp-content/uploads/2018/10/mars-scientific-city-glaskuppeln.jpg" alt="City" className="w-full h-64 object-cover rounded-md mb-4" />
                    <h2 className="text-2xl font-bold text-mars-accent">{name}</h2>
                    <p className="text-gray-300 w-full flex"><span className='w-full'>Bevölkerung: </span><span className="font-bold w-full flex place-content-end">10.000</span></p>
                    <p className="text-gray-300 w-full flex"><span className='w-full'>Energie-Leistung: </span><span className="font-bold w-full flex place-content-end">500 MW</span></p>
                    <p className="text-gray-300 w-full flex"><span className='w-full'>Aktive Fahrzeuge: </span><span className="font-bold w-full flex place-content-end">200</span></p>
                    <button className="mt-4 px-4 py-2 bg-mars-accent text-white rounded-md hover:bg-mars-accent/90 transition-colors">Mehr Details</button>
                    <button className="mt-4 ml-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors">Bewohner-Verzeichnis</button>
                    <button className="mt-4 ml-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors">Energie-Verbrauch</button>
                </div>
                <div>
                    <h4 className="text-xl font-bold text-mars-accent mb-2">Beschreibung</h4>
                    <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <hr className="border-gray-700 my-5"/>
                    <h4 className="text-xl font-bold text-mars-accent mb-2">Bevölkerungsentwicklung</h4>
                    <RessourcesChart data={[
                        { name: 'Jan', amount: 400 },
                        { name: 'Feb', amount: 100 },
                        { name: 'Mär', amount: 350 },
                        { name: 'Apr', amount: 420 },
                        { name: 'Mai', amount: 480 },
                        { name: 'Jun', amount: 550 },
                        { name: 'Jul', amount: 430 },
                        { name: 'Aug', amount: 580 },
                        { name: 'Sep', amount: 490 },
                        { name: 'Okt', amount: 410 },
                        { name: 'Nov', amount: 370 },
                        { name: 'Dez', amount: 450 }
                    ]} isLoading={false} />
                    <hr className="border-gray-700 my-5"/>
                    <h4 className="text-xl font-bold text-mars-accent mb-2">Energieverbrauch</h4>
                    <RessourcesChart data={[
                        { name: 'Jan', amount: 300 },
                        { name: 'Feb', amount: 200 },
                        { name: 'Mär', amount: 250 },
                        { name: 'Apr', amount: 320 },
                        { name: 'Mai', amount: 380 },
                        { name: 'Jun', amount: 450 },
                        { name: 'Jul', amount: 330 },
                        { name: 'Aug', amount: 480 },
                        { name: 'Sep', amount: 390 },
                        { name: 'Okt', amount: 310 },
                        { name: 'Nov', amount: 270 },
                        { name: 'Dez', amount: 350 }
                    ]} isLoading={false} />
                </div>
            </div>
        </section>
    );
}

export default City;