import { BASE_API_URI } from '../configs/constantes'
import { AddUserInterface, UserInterface } from '../interfaces/user-interface'

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

export const logout = async () => {
    const request = new Request(`${BASE_API_URI}/api/users/logout/`, {
        method: 'GET',
        credentials: 'include'
    })
    const response = await fetch(request);
    if (response.status != 200) {
        throw (await response.json());
    }
    return response.json();
}

export const getAllUsers = async (): Promise<UserInterface[]> => {
    const request = new Request(`${BASE_API_URI}/api/users/`, {
        method: 'GET',
        credentials: 'include'
    })
    const response = await fetch(request);
    if (response.status != 200) {
        throw (await response.json());
    }
    return response.json();
}

function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue ?? '';
}

export const addUser = async (user: AddUserInterface) => {
    // const csrftoken = getCookie('csrftoken');
    const request = new Request(`${BASE_API_URI}/api/users/`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
    const response = await fetch(request);
    if (response.status != 201) {
        throw (await response.json());
    }
    return response.json();
}