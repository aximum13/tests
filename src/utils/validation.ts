import { TestState } from 'models/tests/types';
import * as Yup from 'yup';

export const signUpValid = Yup.object().shape({
  username: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required('Введите имя')
    .test('notOnlyWhitespace', 'Введите имя', (value) => {
      return /\S/.test(value);
    })
    .min(3, 'Введите не менее 3 символов')
    .max(50, 'Введите не более 50 символов'),
  password: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required('Введите пароль')
    .test('notOnlyWhitespace', 'Введите пароль', (value) => {
      return /\S/.test(value);
    })
    .min(6, 'Введите не менее 6 символов')
    .max(50, 'Введите не более 50 символов'),

  password_confirmation: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required('Введите пароль ещё раз')
    .test('notOnlyWhitespace', 'Повторите пароль', (value) => {
      return /\S/.test(value);
    })
    .min(6, 'Введите не менее 6 символов')
    .max(50, 'Введите не более 50 символов'),
});

export const signInValid = Yup.object().shape({
  username: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required('Введите имя')
    .test('notOnlyWhitespace', 'Введите имя', (value) => {
      return /\S/.test(value);
    })
    .min(3, 'Введите не менее 3 символов')
    .max(50, 'Введите не более 50 символов'),
  password: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required('Введите пароль')
    .test('notOnlyWhitespace', 'Введите пароль', (value) => {
      return /\S/.test(value);
    })
    .min(6, 'Введите не менее 6 символов')
    .max(50, 'Введите не более 50 символов'),
});

export const testTitleValid = Yup.object().shape({
  title: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required('Введите назвавние теста')
    .test('notOnlyWhitespace', 'Введите назвавние теста', (value) => {
      return /\S/.test(value);
    })
    .min(3, 'Введите не менее 3 символов')
    .max(100, 'Введите не более 100 символов'),
});

export const questionTitleValid = Yup.object().shape({
  title: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required('Введите назвавние вопроса')
    .test('notOnlyWhitespace', 'Введите назвавние вопроса', (value) => {
      return /\S/.test(value);
    })
    .min(3, 'Введите не менее 3 символов')
    .max(100, 'Введите не более 100 символов'),
});

export const answerValid = (question_type: string) =>
  Yup.object().shape({
    text:
      question_type !== 'number'
        ? Yup.string()
            .transform((value) => (value ? value.trim() : value))
            .required('Введите ответ')
            .test('notOnlyWhitespace', 'Введите ответ', (value) =>
              /\S/.test(value)
            )
            .min(1, 'Введите не менее 1 символа')
            .max(30, 'Введите не более 30 символов')
        : Yup.string()
            .required('Введите ответ')
            .matches(/^[0-9]+$/, 'Введите только цифры'),
  });

export const questionValid = (
  question_type: string,
  answer: number,
  countIsRight: number,
  setErrorText?: React.Dispatch<React.SetStateAction<string>>
) => {
  if (question_type !== 'number' && answer < 2) {
    setErrorText && setErrorText('Ответов должно быть не менее 2');
    return false;
  }
  switch (question_type) {
    case 'single':
      if (countIsRight !== 1) {
        setErrorText && setErrorText('Выберите один верный ответ');
        return false;
      }
      break;

    case 'multiple':
      if (countIsRight < 1) {
        setErrorText && setErrorText('Выберите верные ответы');
        return false;
      }
      break;

    case 'number':
      if (answer < 1) {
        setErrorText && setErrorText('Добавьте ответ');
        return false;
      }
      break;
  }
  setErrorText && setErrorText('');
  return true;
};

export const validTest = (test: TestState) => {
  return (
    test.questions.length !== 0 &&
    test.questions.every((question) => {
      const countIsRight =
        question?.answers?.reduce(
          (count, answer) => (answer.is_right ? count + 1 : count),
          0
        ) || 0;
      const isValid = questionValid(
        question.question_type,
        question.answer,
        countIsRight
      );
      return isValid;
    })
  );
};
