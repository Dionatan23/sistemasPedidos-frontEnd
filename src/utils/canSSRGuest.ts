import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

// Função para paginas que só pode ser acessadas por visitantes
export function canSSRGuest<p>(fn: GetServerSideProps<p>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<p>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["@sistemaPedidos.token"]

    console.log(token)

    if (token) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false
        }
      };
    }

    return await fn(ctx);
  };
}
