export interface iLogin {
    email: string
    password: string
    // rememberMe: boolean
    [propName: string]: any
}

export interface iPassword {
    old_password: string,
    password: string,
    password_confirmation: string
    [propName: string]: any
}

export interface resedEmail {
    email: string
    url: string
}

export interface verifyEmail {
    email: string
    url?: string
    code: string
}

export interface iUserDetail {
    name: string
    email: string
    phone: string
    address: string
    password?: string
    confirm_password?: string
    photo?: string
    token?: string
    citizenship_front?: string | null
    citizenship_back?: string | null
    email_verified_at?: string
    created_at?: string
    id?: string
    [propName: string]: any
}

export interface iErrorMessage {
    [propName: string]: Array<string>
}

export interface resetPassword {
    password: string
    password_confirmation: string
    email: string
    code: string
}