import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies"; 
import { AuthTokenErro } from "./errors/AuthTokenErro"; 
import { signOut } from "@/contexts/AuthContext";

export function setupApiClient(ctx = undefined) {
    let cookies = parseCookies(ctx)

    const  api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@sistemaPedidos.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        if (error.response.status === 401){
            // Qualquer erro 401 (Não autorizado) devemos deslogar o user 
            if (typeof window !== undefined){
                // chamar  a função para deslogar user
                signOut(); 
            }else {
                 return Promise.reject(new AuthTokenErro());
            }
        }

        return Promise.reject(error);
    })

    return api
}