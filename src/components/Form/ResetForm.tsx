import { useFormikContext } from 'formik';
import { useAppSelector } from 'hooks';
import { isOpenModal } from 'models/tests/selectors';
import { useEffect } from 'react';

interface Props {
  isSubmit: boolean;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetForm: React.FC<Props> = ({ isSubmit, setIsSubmit }) => {
  const { resetForm } = useFormikContext();

  const isOpen = useAppSelector(isOpenModal);

  useEffect(() => {
    if (!isOpen && !isSubmit) {
      setTimeout(() => {
        resetForm();
      }, 100);
    } else if (!isOpen && isSubmit) {
      setIsSubmit(false);
    }
  }, [resetForm, isOpen, isSubmit, setIsSubmit]);
  return null;
};
export default ResetForm;
