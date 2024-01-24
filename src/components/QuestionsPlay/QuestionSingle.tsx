import { AnswerState } from 'models/tests/types';

import styles from './QuestionPlay.module.sass';
import { useCallback } from 'react';

interface Props {
  indexAnswer: number;
  questionId: number;
  isChecked: boolean;
  answer: AnswerState;
  handleSingleAnswerChange: (id: number, value: number) => void;
}

const QuestionSingle = ({
  indexAnswer,
  questionId,
  handleSingleAnswerChange,
  isChecked,
  answer,
}: Props) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSingleAnswerChange(questionId, +e.target.value);
    },
    [handleSingleAnswerChange, questionId]
  );

  return (
    <label className={styles.LabelAnswer}>
      <input
        className={styles.CheckedAnswer}
        type="radio"
        name={`question-${questionId}`}
        value={indexAnswer}
        checked={isChecked}
        onChange={handleChange}
      />
      {
        <p>
          {indexAnswer + 1}. {answer.text}
        </p>
      }
    </label>
  );
};

export default QuestionSingle;
