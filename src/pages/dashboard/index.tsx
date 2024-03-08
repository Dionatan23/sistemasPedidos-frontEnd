import { Header } from "@/components/Header";
import Head from "next/head";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Painel - Sistema de Pedidos</title>
      </Head>
      <div>
        <Header />
      </div>
    </>
  );
}

export  const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})