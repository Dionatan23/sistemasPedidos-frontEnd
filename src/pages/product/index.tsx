import { useState, ChangeEvent } from "react";
import Head from "next/head";
import styles from "./product.module.scss";
import { Header } from "@/components/Header";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";

export default function Product() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imgAvatar, setImgAvatar] = useState(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImgAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <Head>
        <title>Novo Produto - Sistema de Pedidos</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo produto</h1>
          <form className={styles.formContent}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={25} color="#fff" />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {/* Se tiver a url da imagem "avatarUrl", exibe o componente Image */}
              {avatarUrl && (
                <Image
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select>
              <option value="">Bebidas</option>
              <option value="">Pizzas</option>
            </select>
            <input
              className={styles.input}
              type="text"
              placeholder="Nome do produto"
            />
            <input
              className={styles.input}
              type="text"
              placeholder="R$  Preço"
            />
            <textarea
              className={styles.input}
              placeholder="Descrição do produto"
            />
            <button className={styles.btnAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
