import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    function handleSubmit(event) {

        event.preventDefault();

        navigate("/admin");

    }

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">

                    IAI

                </div>

                <h1>

                    Panel de Administración

                </h1>

                <p>

                    Instituto de Inteligencia Artificial

                </p>

                <form onSubmit={handleSubmit}>

                    <label>

                        Correo electrónico

                    </label>

                    <input
                        type="email"
                        placeholder="admin@iai.cl"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />

                    <label>

                        Contraseña

                    </label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />

                    <button type="submit">

                        Iniciar sesión

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;