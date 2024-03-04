import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/home.module.scss";
import logoImg from "../../public/logo.svg";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Link from "next/link";
import { AunthContext } from "@/contexts/AuthContext";

export default function Home() {
  const { signIn } = useContext(AunthContext);

  // Armazena os dados de login  do usuário no estado da aplicação
  // const [userData, setUserData] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email ==='' || password === ''){
      alert("Preencha os campos!")
      return;
    }

    setLoading(true)

    let data = {
      email,
      password
    };
    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Sistema Pedidos - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo do Sistema de Pedidos" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <TextInput
              placeholder="Digite seu email..."
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              placeholder="Digite sua senha..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>
          <Link href="/singup" className={styles.text}>
            Não possui uma conta ? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  );
}
