import { InputHTMLAttributes, TextareaHTMLAttributes } from "react" 
import styles from "../TextInput/styles.module.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export default function TextInput({...rest}: InputProps) {
    return (
        <input className={styles.textInput} {...rest} />
    )   
}

