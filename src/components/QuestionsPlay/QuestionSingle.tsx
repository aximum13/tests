import { AnswerState } from 'models/tests/types';
import { UserAnswersType } from 'models/playTests/types';

import styles from './QuestionPlay.module.sass';

interface Props {
  indexAnswer: number;
  questionId: number;
  userSelectedAnswers: UserAnswersType[] | undefined;
  answer: AnswerState;
  handleSingleAnswerChange: (id: number, value: number) => void;
}

const QuestionSingle: React.FC<Props> = ({
  indexAnswer,
  userSelectedAnswers,
  questionId,
  handleSingleAnswerChange,

  answer,
}) => {
  const isChecked = userSelectedAnswers?.some(
    (answer) =>
      answer.questionId === questionId && answer.answer === indexAnswer
  );

  return (
    <label className={styles.LabelAnswer}>
      <input
        className={styles.CheckedAnswer}
        type="radio"
        name={`question-${questionId}`}
        value={indexAnswer}
        checked={isChecked}
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
