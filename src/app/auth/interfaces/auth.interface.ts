export interface loginInterface{
    username: String,
    password: String
}

export interface loginResponse{
    ok: boolean,
    error?: String,
    token?: String,
    userData?: {
        id: number,
        username: String
    }
}