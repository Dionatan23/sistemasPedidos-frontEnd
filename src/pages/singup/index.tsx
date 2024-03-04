import { useState, FormEvent, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";
import logoImg from "../../../public/logo.svg";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Link from "next/link";
import { AunthContext } from "@/contexts/AuthContext"; 

export default function SignUp() {
  const { signUp } = useContext(AunthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function  handleSignUp(e: FormEvent) { 
    e.preventDefault();

    if(name === '' ||  email === '' ||  password === ''){
      alert('Todos os campos devem ser preenchidos!')
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await  signUp(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro !</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo do Sistema de Pedidos" />

        <div className={styles.login}>
          <h1>Criando uma conta</h1>
          <form  onSubmit={handleSignUp}>
            <TextInput
              placeholder="Digite seu nome..."
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Cadastrar
            </Button>
          </form>
          <Link href="/" className={styles.text}>
            Já possui uma conta ?
          </Link>
        </div>
      </div>
    </>
  );
}
