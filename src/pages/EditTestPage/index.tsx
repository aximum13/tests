import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getTest } from 'models/tests';
import { allTests, isLoadTests, isTest } from 'models/tests/selectors';

import FormEditTitle from 'components/Form/FormEditTitle';
import FormEditQuestions from 'components/Form/FormEditQuestion';
import FormAddQuestion from 'components/Form/FormAddQuestion';
import ModalCmp from 'components/Modal/Modal';
import Spin from 'components/Spin';

import Select from 'antd/es/select';
import { Button } from 'antd';

import styles from './EditTestPage.module.sass';

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

  const quests = test?.questions || [];

  console.log(test, test?.title, questions);

  const [isEditQuestion, setIsEditQuestion] = useState(false);

  const handleModalEditQuestion = () => {
    setIsEditQuestion(!isEditQuestion);
  };

  const [isNewQuestion, setIsNewQuestion] = useState(false);

  const handleModalAddQuestion = () => {
    setIsNewQuestion(!isNewQuestion);
  };

  return (
    <>
      {loading && <Spin />}
      {testLoaded && (
        <>
          <FormEditTitle
            id={idTest}
            questions={quests}
            title={title}
            created_at={created_at}
          />
          <div className={styles.QuestionsList}>
            {quests &&
              quests.length > 0 &&
              quests.map(({ id, title, answer, question_type }) => (
                <div key={id} className={styles.QuestionsItem}>
                  <Button onClick={handleModalAddQuestion}>
                    Редактировать
                  </Button>
                  <div>{title}</div>
                  <Button>Удалить</Button>
                  <ModalCmp
                    content={
                      <FormEditQuestions
                        id={id}
                        idTest={idTest}
                        title={title}
                        answer={answer}
                        question_type={question_type}
                      />
                    }
                    isOpen={isNewQuestion}
                    handleCancel={handleModalAddQuestion}
                  />
                </div>
              ))}
          </div>
          <div className={styles.AddQuestion}>
            <Select
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

            <Button onClick={handleModalEditQuestion}>Добавить вопрос</Button>
          </div>
        </>
      )}

      <Link to={'/'}>Вернуться на главную страницу</Link>

      <ModalCmp
        content={
          <FormAddQuestion question_type={questionType} idTest={idTest} />
        }
        isOpen={isEditQuestion}
        handleCancel={handleModalEditQuestion}
      />
    </>
  );
};
export default EditTestPage;
