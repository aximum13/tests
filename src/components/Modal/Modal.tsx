import { Modal } from 'antd';
import { ReactNode } from 'react';

interface ModalTypes {
  isOpen?: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  content: React.ReactNode;
  className?: string;
  title: string;
  footer?: ReactNode;
  width?: number;
}

const ModalCmp: React.FC<ModalTypes> = ({
  content,
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
      className={className}
      title={title}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={footer}
      centered
    >
      {content}
    </Modal>
  );
};

export default ModalCmp;
