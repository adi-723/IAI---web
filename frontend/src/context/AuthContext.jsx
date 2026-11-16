
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const API_URL = "http://localhost:5000/api/auth";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkSession() {
            try {
                const response = await fetch(`${API_URL}/me.php`, {
                    method: "GET",
                    credentials: "include"
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error al comprobar sesión:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        checkSession();
    }, []);

    async function login(email, password) {
        const response = await fetch(`${API_URL}/login.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "No se pudo iniciar sesión");
        }

        setUser(data.user);

        return data;
    }

    async function logout() {
        const response = await fetch(`${API_URL}/logout.php`, {
            method: "POST",
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "No se pudo cerrar sesión");
        }

        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
