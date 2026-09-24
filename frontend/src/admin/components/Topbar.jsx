import { useLanguage } from "../../context/LanguageContext";

import es from "../translations/es";
import en from "../translations/en";

import "../styles/Topbar.css";


function Topbar() {

    // Obtenemos el idioma actual
    const { language } = useLanguage();


    // Seleccionamos las traducciones del Admin
    const t = language === "es" ? es : en;


    return (

        <header className="admin-topbar">


            {/* TÍTULO */}

            <div>

                <h2>
                    {t.topbar.title}
                </h2>

            </div>



            {/* USUARIO */}

            <div className="admin-user">


                <div className="admin-avatar">
                    👤
                </div>


                <div>

                    <strong>
                        {t.topbar.administrator}
                    </strong>

                    <span>
                        {t.topbar.account}
                    </span>

                </div>


            </div>


        </header>

    );

}


export default Topbar;