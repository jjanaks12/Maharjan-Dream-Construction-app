export interface iLogin {
    email: string
    password: string
    // rememberMe: boolean
    [propName: string]: any
}

export interface iUserDetail {
    name: string
    email: string
    phone?: string
    address?: string
    photo?: string
    citizenship_front?: string
    citizenship_back?: string
    [propName: string]: any
}

export interface iErrorMessage {
    [propName: string]: Array<string>
}