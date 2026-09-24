import { createContext, useContext, useState } from "react";

import es from "../translations/es";
import en from "../translations/en";

// El contexto se crea UNA SOLA VEZ
const LanguageContext = createContext();

export function LanguageProvider({ children }) {

    const [language, setLanguage] = useState(() => {

        return localStorage.getItem("language") || "es";

    });

    const translations = {

        es,

        en

    };

    function cambiarIdioma(nuevoIdioma) {

        setLanguage(nuevoIdioma);

        localStorage.setItem("language", nuevoIdioma);

    }

    const value = {

        language,

        setLanguage: cambiarIdioma,

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