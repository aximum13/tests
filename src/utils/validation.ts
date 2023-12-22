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

export const addTestValid = Yup.object().shape({
  title: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required('Введите назвавние теста')
    .test('notOnlyWhitespace', 'Введите назвавние теста', (value) => {
      return /\S/.test(value);
    })
    .min(3, 'Введите не менее 3 символов')
    .max(100, 'Введите не более 100 символов'),
});
