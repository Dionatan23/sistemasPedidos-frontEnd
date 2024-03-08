import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenErro } from "@/services/errors/AuthTokenErro";

// Função para paginas que só users logados podem acessar.
export function canSSRAuth<p>(fn: GetServerSideProps<p>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<p>> => {
        const cookies = parseCookies(ctx)
        const token = cookies["@sistemaPedidos.token"]
        
        if (!token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                }
            }
        }

        try {
          return await fn(ctx);  
        }catch(err){
            if(err instanceof AuthTokenErro) {
                destroyCookie(ctx, "@sistemaPedidos.token" )

                return {
                    redirect: {
                        destination: "/",
                        permanent: false,
                    }
                }
            }
        }
    }
}