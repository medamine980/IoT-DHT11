import { BASE_API_URI } from "../configs/constantes"

export const fetchLastIncident = async () => {
    const request = new Request(`${BASE_API_URI}/api/incidents/last-incident/`, {
        method: 'GET'
    });
    const response = await fetch(request);
    if (response.status != 200) {
        throw (await response.json());
    }
    return response.json();
}

export const resolveIncident = async (id: number, comment: string) => {
    const request = new Request(`${BASE_API_URI}/api/incidents/${id}/resolve/`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment
        })
    });
    const response = await fetch(request);
    if (response.status != 200) {
        throw (await response.json());
    }
    return response;
}