import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { auth } from "../Firebase";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";

export default function Header({view, switchView}) {
    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
        setShowDropdown(false);
        const currentLanguage = i18n.language;
        const newLanguage = currentLanguage === 'en' ? 'pl' : 'en';
        i18n.changeLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };
    
    const handleLogout = () => {
        signOut(auth).then((result) => console.log(result))
    }

    const [imgPosition, setImgPosition] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [resizing, setResizing] = useState(false);
    const mainDivRef = useRef(null);

    useEffect(() => {
        const updateImgPosition = () => {
            if (mainDivRef.current) {
                setImgPosition(mainDivRef.current.offsetWidth);
            }
        };

        updateImgPosition();
        window.addEventListener('resize', () => {
            setResizing(true);
            updateImgPosition();
        });
        
        return () => {
            window.removeEventListener('resize', updateImgPosition);
        };
    }, [mainDivRef.current]);


    return (
        <div ref={mainDivRef} className="relative flex gap-x-4 w-3/4 items-center justify-between rounded-full">
            {view === 1 && (
                <button
                    className="absolute left-0 w-16 h-16 border-2 border-black text-black rounded-full items-center justify-center flex"
                    onClick={() => {setResizing(false); setShowDropdown(false); switchView(0); window.localStorage.setItem('view', 0)}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            )}

            {view === 0 && (
                <button
                    className="absolute right-0 w-16 h-16 border-2 border-black text-black rounded-full items-center justify-center flex"
                    onClick={() => {setResizing(false); setShowDropdown(false); switchView(1);  window.localStorage.setItem('view', 1)}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            )}
            <div>
            <motion.div
                    initial={{ x: view === 0 ? 0 : 0 }}
                    animate={{ x: view === 0 ? 0 : imgPosition-80 }}
                    transition={{ duration: resizing ? 0 : 0.6 }}
            ><img src={auth.currentUser.photoURL ? auth.currentUser.photoURL : "./Untitled.png"} className="w-20 h-20 rounded-full cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}/>
            {showDropdown && <div className="p-0 -mx-6 flex flex-col items-center justify-center rounded-xl w-32 h-16 absolute bg-white z-50">
                <p className="w-full text-center rounded-xl hover:bg-gray-400" onClick={changeLanguage}>{t("Switch language")}</p>
                <p className="w-full text-center rounded-xl hover:bg-red-400" onClick={handleLogout}>{t("Logout")}</p></div>}</motion.div>
                
            </div>
        </div>
    )
}