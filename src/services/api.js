const API_URL = "http://127.0.0.1:8000";
// const API_URL = import.meta.env.VITE_API_URL

export const getProperties = async () => {
    const response = await fetch(`${API_URL}/properties/`);
    return response.json();
};

export const getProperty = async (id) => {
    const response = await fetch(`${API_URL}/properties/${id}`);
    return response.json();
};

export async function createProperty(property) {
    const response = await fetch(`${API_URL}/properties/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(property)
    })
    return await response.json()
}


export const getLeads = async () => {
    const response = await fetch(`${API_URL}/leads/`);
    return response.json()
}