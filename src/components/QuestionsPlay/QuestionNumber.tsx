import { useCallback, useEffect, useState } from 'react';
import styles from './QuestionPlay.module.sass';

interface Props {
  questionId: number;
  retryTest: boolean;
  handleSingleAnswerChange: (id: number, value: number) => void;
  valueAnswerNumber: number;
}

const QuestionNumber = ({
  questionId,
  retryTest,
  handleSingleAnswerChange,
  valueAnswerNumber,
}: Props) => {
  const [value, setValue] = useState(valueAnswerNumber.toString());

  useEffect(() => {
    !retryTest && setValue('');
  }, [retryTest]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    handleSingleAnswerChange(questionId, +value);
  }, [handleSingleAnswerChange, questionId, value]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSingleAnswerChange(questionId, +value);
      }
    },
    [handleSingleAnswerChange, questionId, value]
  );

  return (
    <>
      <input
        type="text"
        className={styles.NumberInput}
        value={value}
        placeholder="Введите число"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </>
  );
};

export default QuestionNumber;
