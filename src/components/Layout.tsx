import { useEffect, useState } from 'react';
import Sidebar from './dashboard/Sidebar';
import { calculateMarsSolDate } from '../utils/marsTime';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [marsDate, setMarsDate] = useState({ sol: 0, time: '00:00' });

    useEffect(() => {
        const updateTime = () => {
            const { sol, time } = calculateMarsSolDate(new Date());
            setMarsDate({ sol, time });
        };
        updateTime();

        const timer = setInterval(updateTime, 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden">
            <Sidebar 
                activeSection='overview'
                setSection={() => {}}
            />

            <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
                <header className="mb-8 pb-4 border-b flex justify-between items-center sticky top-0 backdrop-blur z-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold capitalize">
                        Titel..
                    </h2>
                    <div className="text-sm text-gray-400 text-right">
                        Mitarbeiter: <span className="text-mars-accent">{localStorage.getItem('username')}</span> <br />
                        Sol: <b>{marsDate.sol}</b> ({marsDate.time})
                    </div>
                </header>
                <div className="space-y-10 animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;