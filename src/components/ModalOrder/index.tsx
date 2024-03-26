import Modal from "react-modal";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import { OrderItemProps } from "@/pages/dashboard";

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
}

export function ModalOrder({ isOpen, onRequestClose, order }: ModalOrderProps) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      background: "#1d1d2e",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ backgroundColor: "transparent", border: 0 }}
      >
        <FiX color="#f34748" size={45} />
      </button>
      <div className={styles.container}>
        <h2>Detalhes do Pedido</h2>
        <span>Mesa: <strong>{order[0].order.table}</strong></span>
        {order.map(item => (
            <section key={item.id} className={styles.containerItem} >
                <span>{item.amount} - <strong>{item.product.name}</strong></span><br />
                <span className={styles.description}>{item.product.description}</span>
            </section>
        ))}

        <button className={styles.btnOrder}>
            Concluir Pedido
        </button>
      </div>
    </Modal>
  );
}