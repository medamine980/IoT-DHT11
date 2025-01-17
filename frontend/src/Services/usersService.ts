import { BASE_API_URI } from '../configs/constantes'

type LoginParameters = {
    email: string
    password: string
}

export const login = async ({ email, password }: LoginParameters) => {
    const request = new Request(`${BASE_API_URI}/api/users/login/`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const response = await fetch(request);
    if (response.status != 200) {
        throw (await response.json());
    }
    return response.json();
}

export const checkLogin = async () => {
    const request = new Request(`${BASE_API_URI}/api/users/current-user/`, {
        method: 'GET',
        credentials: 'include'
    })
    const response = await fetch(request);
    if (response.status != 200) {
        throw (await response.json());
    }
    return response.json();
}