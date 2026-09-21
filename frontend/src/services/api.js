
const API_URL = "http://localhost:5000/api";

export async function get(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
        let message = `Error ${response.status}: ${response.statusText}`;

        try {
            const errorData = await response.json();

            if (errorData.error) {
                message = errorData.error;
            }
        } catch {
            // No se pudo leer la respuesta como JSON
        }

        throw new Error(message);
    }

    return await response.json();
}

export async function post(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
    });

    if (!response.ok) {
        let message = `Error ${response.status}: ${response.statusText}`;

        try {
            const errorData = await response.json();

            if (errorData.error) {
                message = errorData.error;
            }
        } catch {
            // No se pudo leer la respuesta como JSON
        }

        throw new Error(message);
    }

    return await response.json();
}
