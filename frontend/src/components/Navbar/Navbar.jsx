import { Link } from "react-router-dom";

import Container from "../UI/Container/Container";
import LanguageSwitcher from "../UI/LanguageSwitcher/LanguageSwitcher";

import { useLanguage } from "../../context/LanguageContext";

import "./Navbar.css";

function Navbar() {

    const { t } = useLanguage();

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

                                <Link to="/investigaciones">

                                    {t.navbar.research}

                                </Link>

                            </li>

                            <li>

                                <Link to="/papers">

                                    {t.navbar.papers}

                                </Link>

                            </li>

                            <li>

                                <Link to="/investigadores">

                                    {t.navbar.investigators}

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

                            <li>
                                <Link to="/login">
                                    {t.navbar.login}
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin">
                                    Admin
                                </Link>
                            </li>

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