import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/apiClient";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { toast } from "react-toastify";

type AunthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AunthContext = createContext({} as AunthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@sistemaPedidos.token");
    Router.push("/");
  } catch (error) {
    alert("Erro ao deslogar!");
  }
}

export function AthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user; // !! = Converte  para Booleano, se o  usuário estiver logado vai ser True e False caso contrario.

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      // console.log(response.data);

      const { id, name, token } = response.data;

      setCookie(undefined, "@sistemaPedidos.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Expira em 30 dias
        path: "/", // Quai caminhos "rotas" terao acesso ao cooki, "/" = todos
      });

      setUser({
        id,
        name,
        email,
      });

      // Passar para todas as proximas requisições que fazer o token
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Logado com sucesso!")

      Router.push("/dashboard");
    } catch (error) {
      toast.error("Falha na autenticação, verifique seus dados.");
      console.log("ERRO AO ACESSAR,", error);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    console.log(name, email, password);
    try {
      const response = await api.post("/users", {
        name,
        email,
        password
      })
      
      toast.success("Cadastro realizado com sucesso!");

      Router.push('/');
    } catch (err) {
      toast.error("Erro ao cadastrar! Tente novamente.")
      console.log("ERRO AO CADASTRAR!", err)
    }
  }

  return (
    <AunthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AunthContext.Provider>
  );
}
