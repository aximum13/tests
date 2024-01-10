import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { deleteTest, getTest, isLoading } from 'models/tests';
import { allTests, isLoading as isLoad, isTest } from 'models/tests/selectors';

import FormEditTitle from 'components/Form/FormEditTitle';
import FormAddQuestion from 'components/Form/FormAddQuestion';
import ModalCmp from 'components/Modal/Modal';
import Spin from 'components/Spin';

import Select from 'antd/es/select';
import { Button } from 'antd';

import styles from './EditTestPage.module.sass';
import QuestionEdit from 'components/QuestionEdit';

const EditTestPage = () => {
  const [questionType, setQuestionType] = useState('');
  const [questionTypeError, setQuestionTypeError] = useState('');

  const handleChangeTypeAnswer = (value: string) => {
    setQuestionType(value);
    questionTypeError !== '' && setQuestionTypeError('');
  };

  const dispatch = useAppDispatch();

  const test = useAppSelector(isTest);

  const { id } = useParams();

  const idTest = id ? parseInt(id) : 0;

  useEffect(() => {
    if (idTest !== 0) {
      dispatch(getTest(idTest));
    }
  }, [dispatch, idTest]);

  const { title, created_at, questions } = test
    ? test
    : { title: '', created_at: '', questions: [] };

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModalAddQuestion = () => {
    if (
      questionType === 'single' ||
      questionType === 'multiple' ||
      questionType === 'number'
    )
      setIsOpenModal(!isOpenModal);
    else {
      setQuestionTypeError('Выберите тип вопроса');
      setTimeout(() => {
        setQuestionTypeError('');
      }, 3000);
    }
  };

  const handleDeleteTest = () => {
    test && dispatch(deleteTest(test.id));
  };

  console.log('EditTestPage');

  return (
    <>
      {!test && <Spin />}
      {test && (
        <>
          <Link className={styles.HomeLink} to={'/'}>
            Вернуться на главную страницу
          </Link>
          <div className={styles.EditPage}>
            <FormEditTitle
              id={idTest}
              questions={questions}
              title={title}
              created_at={created_at}
            />
            {questions && questions.length > 0 && (
              <>
                <h2 className={styles.TitleQuestionList}>Список вопросов</h2>
                <div className={styles.QuestionsList}>
                  {questions.map(({ id, title, answer, question_type }) => (
                    <QuestionEdit
                      id={id}
                      title={title}
                      idTest={idTest}
                      answer={answer}
                      question_type={question_type}
                      key={id}
                    />
                  ))}
                </div>
              </>
            )}
            <div className={styles.AddQuestion}>
              <div className={styles.BtnTypeQuestion}>
                <Select
                  className={styles.BtnTypeQuestion}
                  placeholder="Тип вопроса"
                  onChange={handleChangeTypeAnswer}
                  options={[
                    {
                      value: 'single',
                      label: 'Один из списка',
                    },
                    {
                      value: 'multiple',
                      label: 'Несколько из списка',
                    },
                    {
                      value: 'number',
                      label: 'Численный ответ',
                    },
                  ]}
                ></Select>
                {questionTypeError !== '' && (
                  <p className={styles.QuestionTypeError}>
                    {questionTypeError}
                  </p>
                )}
              </div>
              <Button onClick={handleModalAddQuestion}>Добавить вопрос</Button>
            </div>

            <div className={styles.TestFooter}>
              <Button danger onClick={handleDeleteTest}>
                Удалить тест
              </Button>
            </div>
          </div>
          <ModalCmp
            width={600}
            title={'Добавить вопрос'}
            content={
              <FormAddQuestion
                question_type={questionType}
                idTest={idTest}
                setIsOpenModal={setIsOpenModal}
              />
            }
            isOpen={isOpenModal}
            handleCancel={handleModalAddQuestion}
            footer={null}
          />
        </>
      )}
    </>
  );
};
export default EditTestPage;
