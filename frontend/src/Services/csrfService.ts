import { BASE_API_URI } from "../configs/constantes";

export const setCsrfTokenInCookie = async () => {
    return fetch(`${BASE_API_URI}/csrf/`, {
        method: 'GET',
        credentials: 'include', // Ensure cookies are sent
    })
        .then(response => response.json())
        .then(data => console.log('CSRF cookie set:', data))
        .catch(error => console.error('Error setting CSRF cookie:', error));
}