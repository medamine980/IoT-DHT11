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

export const addUser = async (user: AddUserInterface) => {
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


export const deleteUser = async (id: number) => {
    // const csrftoken = getCookie('csrftoken');
    const request = new Request(`${BASE_API_URI}/api/users/${id}/`, {
        method: 'DELETE',
        credentials: 'include'
    })
    const response = await fetch(request);
    if (response.status != 204) {
        throw (await response.json());
    }
}

