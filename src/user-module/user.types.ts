export interface LoginParams {
    email: string;
    password: string;
}

export interface RegisterParams extends LoginParams {
    name: string;
}

export interface PlainUserReturn {
    id: string;
    email: string;
    name: string;
    token?: string;
}