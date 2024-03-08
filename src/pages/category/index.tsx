import Head from "next/head";
import { FormEvent, useState } from "react";
import styles from "./category.module.scss";
import { Header } from "@/components/Header";
import { setupApiClient } from "@/services/api";
import { toast } from "react-toastify";

export default function Category() {
    const [name, setName] = useState(null);

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if(name === ""){
            return (
                toast.warning("Preencha o campo!")
            )
        }

        const  api = setupApiClient();
        await api.post("/category", { name: name })

        toast.success("Categoria cadastrada  com sucesso!");
        
        setName("");
    }

  return (
    <>
      <Head>
        <title>Nova Categoria - Sistema de Pedidos</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar categorias:</h1>
          <form className={styles.formContainer}>
            <input
              type="text"
              placeholder="Nome da categoria"
              className={styles.input}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <button className={styles.btnAdd} type="submit" onClick={handleRegister}>Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}
