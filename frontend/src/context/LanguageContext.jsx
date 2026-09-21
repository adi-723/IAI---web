import { createContext, useContext, useState } from "react";

import es from "../translations/es";
import en from "../translations/en";

// El contexto se crea UNA SOLA VEZ
const LanguageContext = createContext();

export function LanguageProvider({ children }) {

    const [language, setLanguage] = useState("es");

    const translations = {

        es,

        en

    };

    const value = {

        language,

        setLanguage,

        t: translations[language]

    };

    return (

        <LanguageContext.Provider value={value}>

            {children}

        </LanguageContext.Provider>

    );

}

export function useLanguage() {

    return useContext(LanguageContext);

}