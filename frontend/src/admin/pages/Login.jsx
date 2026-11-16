
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            await login(email, password);

            // Volver a la página principal
            navigate("/", { replace: true });

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="login-page">

                <div className="login-content">

                    <Link to="/" className="login-back">
                        ← Volver al inicio
                    </Link>

            <div className="login-card">

                <div className="login-logo">

                    IAI

                </div>

                <h1>

                    Acceso institucional

                </h1>

                <p>

                    Instituto de Inteligencia Artificial

                </p>

                {error && (

                    <div className="login-error">

                        {error}

                    </div>

                )}

                <form onSubmit={handleSubmit}>

                    <label>

                        Correo electrónico

                    </label>

                    <input
                        type="email"
                        placeholder="admin@academicos.uta.cl"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
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
                        required
                    />

                    <button type="submit" disabled={loading}>

                        {loading ? "Ingresando..." : "Iniciar sesión"}

                    </button>

                </form>

                </div>

            </div>

        </div>

    );

}

export default Login;