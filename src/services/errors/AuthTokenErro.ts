export class AuthTokenErro extends Error {
    constructor() {
        super("Erro with authentication token")
    }
}