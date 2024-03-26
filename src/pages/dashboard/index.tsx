import { useState } from "react";
import Modal from "react-modal";  
import { Header } from "@/components/Header";
import Head from "next/head";
import styles from "./dashboard.module.scss"
import { canSSRAuth } from "@/utils/canSSRAuth";
import { FiRefreshCcw } from "react-icons/fi";
import { setupApiClient } from "@/services/api";
import { ModalOrder } from "@/components/ModalOrder";


type OrderProps = {
  id: string,
  table: string | number,
  status: boolean,
  draft: boolean,
  name: string | null,
  created_at: string,
  updated_at: string
}

interface DashProps{
  orders: OrderProps[]
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order: {
    id: string;
    table: string | number;
    name: string | null;
    status: boolean;
  }
}

export default function Dashboard({ orders }: DashProps) {
  const [orderList, setOrderList] = useState(orders || []);
  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalView, setModalView] = useState(false);

  function handleCloseModal() {
    setModalView(false);
    console.log("Modal fechou")
  }

  async function handleModalView(id: string) {
    const api = setupApiClient()
    const  response = await api.get("/details", {
      params: {
        order_id: id
      }
    })

    setModalItem(response.data);
    setModalView(true);
    console.log("Modal Abriu")
  }

  async function handleFinishPedido(id: string){
    const api = setupApiClient()
    await api.put("/finish", {
      order_id: id
    })

    const response = await api.get("/orders")

    setOrderList(response.data);
    setModalView(false);
  }

  async function handleRefreshOrders() {
    const api = setupApiClient()
    const response = await api.get("/orders")

    setOrderList(response.data);
  }

  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>Painel - Sistema de Pedidos</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>
              Últimos pedidos!
            </h1>
            <button onClick={() => handleRefreshOrders()}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listOrder}>

            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido aberto...
              </span>
            )}
            
            {orderList.map( item => (
            <section key={item.id} className={styles.orderItem}>
              <button onClick={() => handleModalView(item.id)}>
                <div className={styles.tag}></div>
                <span>Messa: {item.table}</span>
              </button>
            </section>
            ))}
          </article>

        </main>
        {modalView && (
          <ModalOrder 
            isOpen={modalView}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishPedido}
          />
        )}
      </div>
    </>
  );
}

export  const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setupApiClient(ctx);

  const response = await api.get("/orders");
  // console.log(response.data);

    return {
        props: {
          orders: response.data,
        }
    }
})