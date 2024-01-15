import styles from './QuestionPlay.module.sass';

interface Props {
  numberAnswers: {
    [key: number]: number;
  };
  questionId: number;
  handleNumberChange: (value: number, id: number) => void;
  handleKeyDownNumber: (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: number,
    numberAnswer: number
  ) => void;

  handleSingleAnswerChange: (id: number, value: number) => void;
  disabledQuestion: (id: number) => boolean | undefined;
}

const QuestionNumber: React.FC<Props> = ({
  numberAnswers,
  questionId,
  handleNumberChange,
  handleKeyDownNumber,
  handleSingleAnswerChange,
  disabledQuestion,
}) => {
  return (
    <>
      <input
        type="text"
        className={styles.NumberInput}
        disabled={disabledQuestion(questionId)}
        value={numberAnswers[questionId] || ''}
        placeholder="Введите число"
        onChange={(e) => handleNumberChange(+e.target.value, questionId)}
        onKeyDown={(e) =>
          handleKeyDownNumber(e, questionId, numberAnswers[questionId])
        }
      />
      <button
        disabled={disabledQuestion(questionId)}
        onClick={() =>
          handleSingleAnswerChange(questionId, numberAnswers[questionId])
        }
        className={styles.BtnSelectedAnswer}
      >
        Ответ
      </button>
    </>
  );
};

export default QuestionNumber;
