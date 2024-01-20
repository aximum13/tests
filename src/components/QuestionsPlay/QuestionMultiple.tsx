import classNames from 'classnames';

import { AnswerState } from 'models/tests/types';

import styles from './QuestionPlay.module.sass';

interface Props {
  questionId: number;
  multipleAnswers: {
    [key: number]: {
      id: number;
      value: number;
    }[];
  };
  handleMultipleAnswerChange: (
    id: number,
    indexAnswer: number,

    multipleAnswers: {
      id: number;
      value: number;
    }[]
  ) => void;

  indexAnswer: number;
  answer: AnswerState;
}

const QuestionMultiple: React.FC<Props> = ({
  indexAnswer,
  answer,
  multipleAnswers,
  questionId,
  handleMultipleAnswerChange,
}) => {
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
            checked={(multipleAnswers[questionId] || []).some(
              (userAnswer) =>
                userAnswer.id === questionId && userAnswer.value === indexAnswer
            )}
            onChange={(e) =>
              handleMultipleAnswerChange(
                questionId,
                +e.target.value,

                multipleAnswers[questionId]
              )
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
