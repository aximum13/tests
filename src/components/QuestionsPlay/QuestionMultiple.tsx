import classNames from 'classnames';

import { AnswerState } from 'models/tests/types';

import styles from './QuestionPlay.module.sass';
import { useCallback } from 'react';

interface Props {
  questionId: number;
  indexAnswer: number;
  isChecked: boolean;
  answer: AnswerState;
  handleMultipleAnswerChange: (id: number, indexAnswer: number) => void;
}

const QuestionMultiple = ({
  indexAnswer,
  answer,

  questionId,
  handleMultipleAnswerChange,
  isChecked,
}: Props) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleMultipleAnswerChange(questionId, +e.target.value);
    },
    [handleMultipleAnswerChange, questionId]
  );
  return (
    <>
      <div key={indexAnswer}>
        <label className={styles.LabelAnswer}>
          <input
            className={classNames(
              styles.CheckedAnswer,
              styles.CheckedMultipleAnswer
            )}
            type="checkbox"
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
      </div>
    </>
  );
};

export default QuestionMultiple;
