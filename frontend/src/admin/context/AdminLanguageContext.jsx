import { createContext, useContext, useState } from "react";

import es from "../translations/es";
import en from "../translations/en";

const AdminLanguageContext = createContext();

export function AdminLanguageProvider({ children }) {
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
        <AdminLanguageContext.Provider value={value}>
            {children}
        </AdminLanguageContext.Provider>
    );
}

export function useAdminLanguage() {
    return useContext(AdminLanguageContext);
}