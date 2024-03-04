import { ReactNode, ButtonHTMLAttributes } from "react" 
import styles from "../Button/style.module.scss"
import { FaSpinner } from "react-icons/fa" 

interface BtnProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    loading?: boolean
}


export default function Button({children, loading, ...rest}:BtnProps) {

    return (
        <button 
            className={styles.button}
            disabled={loading}
            {...rest}
        >
            {loading ? (
                <FaSpinner  color="#FFF" size="16px"/>
            ) : (
                <a className={styles.buttonText}>{children}</a>
            )}
        </button>
    )
}