import { Modal } from 'antd';

interface ModalTypes {
  isOpen?: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  content: React.ReactNode;
}

const ModalCmp: React.FC<ModalTypes> = ({
  content,
  isOpen,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal
      title="Custom Modal"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {content}
    </Modal>
  );
};

export default ModalCmp;
