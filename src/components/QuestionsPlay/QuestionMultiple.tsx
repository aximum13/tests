import classNames from 'classnames';

import { AnswerState } from 'models/tests/types';

import styles from './QuestionPlay.module.sass';

interface Props {
  multipleAnswers: {
    [key: number]: {
      id: number;
      value: number;
    }[];
  };
  questionId: number;
  disabledQuestion: (id: number) => boolean | undefined;
  handleMultipleAnswerChange: (id: number, indexAnswer: number) => void;

  indexAnswer: number;
  answer: AnswerState;
}

const QuestionMultiple: React.FC<Props> = ({
  indexAnswer,
  answer,

  multipleAnswers,
  questionId,
  disabledQuestion,
  handleMultipleAnswerChange,
}) => {
  return (
    <>
      <div key={indexAnswer}>
        <label className={styles.LabelAnswer}>
          <input
            disabled={disabledQuestion(questionId)}
            className={classNames(
              styles.CheckedAnswer,
              styles.CheckedMultipleAnswer
            )}
            type="checkbox"
            value={indexAnswer}
            checked={(multipleAnswers[questionId] || []).some(
              (userAnswer) =>
                userAnswer.id === questionId && userAnswer.value === indexAnswer
            )}
            onChange={(e) =>
              handleMultipleAnswerChange(questionId, +e.target.value)
            }
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
