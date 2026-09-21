const API_URL =
    "http://localhost/IAI-web/backend/api/investigators.php";

export async function getInvestigators() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("No se pudieron obtener los investigadores.");
    }

    return response.json();
}

export async function createInvestigator(investigator) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(investigator)
    });

    if (!response.ok) {
        throw new Error("No se pudo crear el investigador.");
    }

    return response.json();
}

export async function deleteInvestigator(id) {
    const response = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("No se pudo eliminar el investigador.");
    }

    return response.json();
}