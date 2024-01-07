import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { deleteTest, getTest } from 'models/tests';
import { allTests, isLoadTests, isTest } from 'models/tests/selectors';

import FormEditTitle from 'components/Form/FormEditTitle';
import FormAddQuestion from 'components/Form/FormAddQuestion';
import ModalCmp from 'components/Modal/Modal';
import Spin from 'components/Spin';

import Select from 'antd/es/select';
import { Button } from 'antd';

import styles from './EditTestPage.module.sass';
import QuestionEdit from 'components/QuestionEdit';

const EditTestPage = () => {
  const [editTitle, setEditTitle] = useState('');
  const [questionType, setQuestionType] = useState('');

  const handleEditTitle = (editFormTitle: { title: string }) => {
    setEditTitle(editFormTitle.title);
  };

  const [testLoaded, setTestLoaded] = useState(false);

  const handleChangeTypeAnswer = (value: string) => {
    setQuestionType(value);
  };

  const dispatch = useAppDispatch();

  const test = useAppSelector(isTest);
  const tests = useAppSelector(allTests);

  console.log(tests, test);

  const { id } = useParams();

  const idTest = id ? parseInt(id) : 0;

  useEffect(() => {
    if (test?.id !== idTest) dispatch(getTest(idTest));
  }, [dispatch, idTest, test]);

  useEffect(() => {
    if (test) {
      setTestLoaded(true);
    }
  }, [test]);

  const loading = useAppSelector(isLoadTests);

  const { title, created_at, questions } = test
    ? test
    : { title: '', created_at: '', questions: [] };

  console.log(test, test?.title, questions);

  const [isNewQuestion, setIsNewQuestion] = useState(false);

  const handleModalAddQuestion = () => {
    setIsNewQuestion(!isNewQuestion);
  };

  const handleDeleteTest = () => {
    test && dispatch(deleteTest(test.id));
  };

  return (
    <>
      {loading && <Spin />}
      <Link className={styles.HomeLink} to={'/'}>
        Вернуться на главную страницу
      </Link>
      {testLoaded && (
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

            <Button onClick={handleModalAddQuestion}>Добавить вопрос</Button>
          </div>

          <div className={styles.TestFooter}>
            <Button onClick={handleDeleteTest}>Удалить тест</Button>
          </div>
        </div>
      )}

      <ModalCmp
        width={600}
        title={'Добавить вопрос'}
        content={
          <FormAddQuestion question_type={questionType} idTest={idTest} />
        }
        isOpen={isNewQuestion}
        handleCancel={handleModalAddQuestion}
      />
    </>
  );
};
export default EditTestPage;
