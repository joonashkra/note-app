import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';

export default function NavBar() {

    const [dropdown, setDropDown] = useState(false)

    const newRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        };
    });

    const handleDropDown = () => {
        setDropDown(!dropdown)
    }

    const handleOutsideClick = (e: MouseEvent) => {
        if (newRef.current && !newRef.current.contains(e.target as Node)) {
            setDropDown(false)
        }
    }

    return (
        <div ref={newRef} className="sm:flex sm:flex-row sm:justify-between flex-col bg-black text-white sm:p-8 p-4 transform ease-in-out duration-200">
            <div className={dropdown ? 'font-navFont flex justify-center items-center text-center text-2xl font-normal mb-6 sm:mb-0' : 'font-navFont flex justify-center items-center text-center text-2xl font-normal mb-2 sm:mb-0'}>
                <h1>NotesApp</h1>
            </div>
            <nav className={dropdown ? 'sm:flex justify-center items-center text-center' : 'sm:flex hidden justify-center items-center text-center'}>
                <ul className="flex sm:flex-row flex-col sm:gap-8 md:gap-12 lg:gap-14 gap-4 text-xl font-normal" onClick={handleDropDown}>
                    <NavLink to="/" className="hover:text-cyan-300">Home</NavLink>
                    <NavLink to="/create" className="hover:text-cyan-300">Create Note</NavLink>
                    <NavLink to="/login" className="hover:text-cyan-300">Log In</NavLink>
                </ul>
            </nav>
            <div onClick={handleDropDown} className={dropdown ? 'flex justify-center items-center text-center sm:hidden mt-8 transition-all duration-300' : 'flex justify-center items-center text-center sm:hidden transition-all duration-300'}>
                {!dropdown && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f48a18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>}
                {dropdown && <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f48a18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>}
            </div>
        </div>
    );
}