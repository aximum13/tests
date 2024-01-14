import { Button, Modal } from 'antd';
import { ReactNode } from 'react';

import styles from './ModalChoice.module.sass';

interface ModalTypes {
  isOpen?: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  className?: string;
  title?: string;
  footer?: ReactNode;
  width?: number;
}

const ModalChoice: React.FC<ModalTypes> = ({
  isOpen,
  handleOk,
  handleCancel,
  className,
  title,
  footer,
  width,
}) => {
  return (
    <Modal
      width={width}
      open={isOpen}
      onCancel={handleCancel}
      footer={[
        <div key="buttons" className={styles.BtnGroup}>
          <Button
            size="large"
            type="primary"
            className={styles.ModalChoiceBtn}
            onClick={handleOk}
          >
            Да
          </Button>
          <Button
            size="large"
            className={styles.ModalChoiceBtn}
            onClick={handleCancel}
          >
            Нет
          </Button>
        </div>,
      ]}
      centered
    >
      <p className={styles.Title}>{title}</p>
    </Modal>
  );
};

export default ModalChoice;
