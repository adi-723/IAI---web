import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    return (

        <nav className="navbar">

            <div className="logo">

                IAI

            </div>

            <ul>

                <li>

                    <Link to="/">Inicio</Link>

                </li>

                <li>

                    <Link to="/investigadores">

                        Investigadores

                    </Link>

                </li>

                <li>

                    <Link to="/papers">

                        Papers

                    </Link>

                </li>

                <li>

                    <Link to="/proyectos">

                        Proyectos

                    </Link>

                </li>

                <li>

                    <Link to="/noticias">

                        Noticias

                    </Link>

                </li>

                <li>

                    <Link to="/contacto">

                        Contacto

                    </Link>

                </li>

            </ul>

        </nav>

    );

}

export default Navbar;