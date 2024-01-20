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
}

const QuestionNumber: React.FC<Props> = ({
  numberAnswers,
  questionId,
  handleNumberChange,
  handleKeyDownNumber,
  handleSingleAnswerChange,
}) => {
  return (
    <>
      <input
        type="text"
        className={styles.NumberInput}
        value={numberAnswers[questionId] || ''}
        placeholder="Введите число"
        onChange={(e) => handleNumberChange(+e.target.value, questionId)}
        onKeyDown={(e) =>
          handleKeyDownNumber(e, questionId, numberAnswers[questionId])
        }
        onBlur={() =>
          handleSingleAnswerChange(questionId, numberAnswers[questionId])
        }
      />
    </>
  );
};

export default QuestionNumber;
