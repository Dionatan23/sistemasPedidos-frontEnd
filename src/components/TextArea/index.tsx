import { TextareaHTMLAttributes } from "react";
import styles from "../TextArea/styles.module.scss"

interface  TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function TextArea({...rest}: TextAreaProps){
    return (
        <textarea className={styles.textInput} {...rest}></textarea>
    )
}