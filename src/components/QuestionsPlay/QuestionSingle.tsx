import { AnswerState } from 'models/tests/types';
import { UserAnswersType } from 'models/playTests/types';

import styles from './QuestionPlay.module.sass';

interface Props {
  indexAnswer: number;
  userSelectedAnswers: UserAnswersType[] | undefined;
  questionId: number;
  handleSingleAnswerChange: (id: number, value: number) => void;
  disabledQuestion: (id: number) => boolean | undefined;
  answer: AnswerState;
}

const QuestionSingle: React.FC<Props> = ({
  indexAnswer,
  userSelectedAnswers,
  questionId,
  handleSingleAnswerChange,
  disabledQuestion,
  answer,
}) => {
  return (
    <label className={styles.LabelAnswer}>
      <input
        disabled={disabledQuestion(questionId)}
        className={styles.CheckedAnswer}
        type="radio"
        name={`question-${questionId}`}
        value={indexAnswer}
        checked={userSelectedAnswers?.some(
          (answer) =>
            answer.questionId === questionId && answer.answer === indexAnswer
        )}
        onChange={(e) => handleSingleAnswerChange(questionId, +e.target.value)}
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
