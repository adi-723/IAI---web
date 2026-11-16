
import { Link } from "react-router-dom";

import Container from "../UI/Container/Container";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";

import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

function Navbar() {

    const { t } = useLanguage();
    const { user, logout } = useAuth();

    return (

        <header className="navbar">

            <Container>

                <div className="navbar-content">

                    <div className="logo">

                        <Link to="/">

                            <span className="logo-circle">

                                IAI

                            </span>

                            <span>

                                Instituto IAI

                            </span>

                        </Link>

                    </div>

                    <nav>

                        <ul>

                            <li>
                                <Link to="/">
                                    {t.navbar.home}
                                </Link>
                            </li>

                            <li>
                                <Link to="/investigadores">
                                    {t.navbar.investigators}
                                </Link>
                            </li>

                            <li>
                                <Link to="/papers">
                                    {t.navbar.papers}
                                </Link>
                            </li>

                            <li>
                                 <Link to="/investigaciones">
                                    {t.navbar.research}
                                </Link>
                            </li>

                            <li>
                                <Link to="/noticias">
                                    {t.navbar.news}
                                </Link>
                            </li>

                            <li>
                                <Link to="/contacto">
                                    {t.navbar.contact}
                                </Link>
                            </li>

                            {/* Opciones según el estado de sesión */}

                            {!user ? (

                                <li className="institutional-access">
                                    <Link to="/login">
                                        login
                                    </Link>
                                </li>

                            ) : (

                                <>
                                    {user.role === "Administrador" && (
                                        <li>
                                            <Link to="/admin">
                                                Admin
                                            </Link>
                                        </li>
                                    )}

                                    {user.role === "Editor" && (
                                        <li>
                                            <Link to="/admin/news">
                                                Noticias
                                            </Link>
                                        </li>
                                    )}

                                    {user.role === "Investigador" && (
                                        <li>
                                            <Link to="/mi-cuenta">
                                                Mi espacio
                                            </Link>
                                        </li>
                                    )}

                                    <li>
                                        <button
                                            type="button"
                                            className="logout-button"
                                            onClick={logout}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </>

                            )}

                        </ul>

                    </nav>

                    <div className="navbar-actions">

                        <LanguageSwitcher />

                    </div>

                </div>

            </Container>

        </header>

    );

}

export default Navbar;
