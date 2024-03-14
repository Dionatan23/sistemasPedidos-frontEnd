import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import styeles from "./header.module.scss";
import logo from "../../../public/logo.svg";
import { FiLogOut } from "react-icons/fi";
import { AunthContext } from "@/contexts/AuthContext";

export function Header() {

    const { signOut } = useContext(AunthContext)

  return (
    <header className={styeles.headerContainer}>
      <div className={styeles.headerContent}>
        <Link href="/dashboard">
          <Image className={styeles.logo} src={logo} alt="logo" width={190} height={60} />
        </Link>

        <nav className={styeles.menuContainer}>
          <Link className={styeles.a} href="/category">Categoria</Link>
          <Link className={styeles.a} href="/product">Cartapio</Link>
          <button onClick={signOut}>
            <FiLogOut color="#fff" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
