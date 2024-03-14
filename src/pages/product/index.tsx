import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import styles from "./product.module.scss";
import { Header } from "@/components/Header";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupApiClient } from "@/services/api";
import { toast } from "react-toastify";

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryProps) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imgAvatar, setImgAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList);
  const [categorySelect, setCategorySelect] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const  [description, setDescription] = useState("");

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

  // Função responsavél por selecionar  a categoria de acordo com o index da lista
  function handleSelectCategory(e) {
    // console.log("Categoria, posição", e.target.value);
    // console.log("Categoria selecionada!", categories[e.target.value]);
    setCategorySelect(e.target.value);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new  FormData();
      if(name === "" || price === "" || description === ""){
        toast.warning('Preencha todos os campos');
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelect].id);
      data.append("file", imgAvatar);

      const api = setupApiClient()
      await api.post("/product", data)

      toast.success("Produto cadastrado com sucesso!");

    } catch (error) {
      toast.error("Ops! Erro no cadastro do produto!");
    }

    setName("");
    setPrice("");
    setDescription("");
    setImgAvatar(null);
    setAvatarUrl("");
    
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
          <form className={styles.formContent} onSubmit={handleRegister}>
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

            <select value={categorySelect} onChange={handleSelectCategory} >
              <option>Selecione uma categoria</option>
                {categories.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.name}
                    </option>
                  )
                })}
            </select>
            <input
              className={styles.input}
              type="text"
              placeholder="Nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="R$  Preço"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              className={styles.input}
              placeholder="Descrição do produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export  const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setupApiClient(ctx)

  const  response = await api.get("/category")

  return {
    props:{
      categoryList: response.data
    }
  }
})