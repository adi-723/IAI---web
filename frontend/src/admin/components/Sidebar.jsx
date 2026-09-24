import { NavLink } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";

import es from "../translations/es";
import en from "../translations/en";

import "../styles/Sidebar.css";


function Sidebar() {

    // Obtenemos el idioma que está usando actualmente
    // toda la aplicación.
    const { language } = useLanguage();


    // Seleccionamos las traducciones del Admin
    // según el idioma actual.
    const t = language === "es" ? es : en;


    return (

        <aside className="admin-sidebar">


            {/* LOGO */}

            <div className="admin-sidebar-logo">

                <span className="admin-logo-circle">
                    IAI
                </span>


                <div>

                    <strong>
                        IAI Admin
                    </strong>

                    <small>
                        {t.sidebar.administration}
                    </small>

                </div>

            </div>



            {/* NAVEGACIÓN */}

            <nav className="admin-navigation">


                {/* DASHBOARD */}

                <NavLink to="/admin" end>

                    <span>
                        ▣
                    </span>

                    <span>
                        {t.sidebar.dashboard}
                    </span>

                </NavLink>



                {/* INVESTIGADORES */}

                <NavLink to="/admin/investigators">

                    <span>
                        👨‍🔬
                    </span>

                    <span>
                        {t.sidebar.investigators}
                    </span>

                </NavLink>



                {/* PAPERS */}

                <NavLink to="/admin/papers">

                    <span>
                        📄
                    </span>

                    <span>
                        {t.sidebar.papers}
                    </span>

                </NavLink>



                {/* NOTICIAS */}

                <NavLink to="/admin/news">

                    <span>
                        📰
                    </span>

                    <span>
                        {t.sidebar.news}
                    </span>

                </NavLink>



                {/* INVESTIGACIONES */}

                <NavLink to="/admin/research-groups">

                    <span>
                        🔬
                    </span>

                    <span>
                        {t.sidebar.research}
                    </span>

                </NavLink>



                {/* USUARIOS */}

                <NavLink to="/admin/users">

                    <span>
                        👤
                    </span>

                    <span>
                        {t.sidebar.users}
                    </span>

                </NavLink>

            </nav>



            {/* SALIR */}

            <div className="admin-sidebar-footer">

                <NavLink to="/">

                    <span>
                        ←
                    </span>

                    <span>
                        {t.sidebar.exit}
                    </span>

                </NavLink>

            </div>


        </aside>

    );

}


export default Sidebar;