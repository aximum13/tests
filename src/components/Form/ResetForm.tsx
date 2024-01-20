import { useFormikContext } from 'formik';
import { useAppSelector } from 'hooks';
import { isOpenModal } from 'models/tests/selectors';
import { useEffect } from 'react';

const ResetForm: React.FC = () => {
  const { resetForm } = useFormikContext();

  const isOpen = useAppSelector(isOpenModal);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        resetForm();
      }, 100);
    }
  }, [resetForm, isOpen]);
  return null;
};
export default ResetForm;
