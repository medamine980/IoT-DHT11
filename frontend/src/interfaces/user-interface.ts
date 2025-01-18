interface BaseUserInterface {
    first_name: string
    last_name: string
    email: string
    is_staff: boolean
    roles: string
}

export interface UserInterface extends BaseUserInterface {
    id: number
    last_login: string
}

export interface AddUserInterface extends BaseUserInterface {
    password: string
}