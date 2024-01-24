import { Button, Modal } from 'antd';

import styles from './ModalChoice.module.sass';

interface ModalTypes {
  isOpen?: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  title?: string;
  width?: number;
  textOk?: string;
  textCancel?: string;
}

const ModalChoice = ({
  isOpen,
  handleOk,
  handleCancel,

  title,

  width,
  textOk,
  textCancel,
}: ModalTypes) => {
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
            {textOk ? textOk : 'Да'}
          </Button>
          <Button
            size="large"
            className={styles.ModalChoiceBtn}
            onClick={handleCancel}
          >
            {textCancel ? textCancel : 'Нет'}
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
