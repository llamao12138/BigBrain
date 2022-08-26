import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const AnswerFields = (props) => {
  let answersObj = props.answers;
  // console.log(JSON.stringify(answersObj));

  const ifCorrects = [];
  const answers = [];

  answersObj.forEach(answer => {
    ifCorrects.push(answer.correct);
    answers.push(answer.answer);
  });

  // console.log(ifCorrects);
  // console.log(answers);

  // Answer Handling functions
  const [answerField, setAnswerField] = React.useState(answers);
  const [ifCorrect, setIfCorrect] = React.useState(ifCorrects);
  const addAnswer = () => {
    setAnswerField([...answerField, '']);
    setIfCorrect([...ifCorrect, false]);
    setAnswersObj();
    props.setAnswers(answersObj);
  };
  const removeAnswer = (index) => {
    answerField.splice(index, 1);
    ifCorrect.splice(index, 1);
    setAnswerField([...answerField]);
    setIfCorrect([...ifCorrect]);
    setAnswersObj();
    props.setAnswers(answersObj);
  };
  const handleAnswersChange = (event, index) => {
    answerField[index] = event.target.value;
    setAnswerField([...answerField]);
    setAnswersObj();
    props.setAnswers(answersObj);
  };
  const handleIfCorrectChange = (event, index) => {
    ifCorrect[index] = event.target.checked;
    setIfCorrect([...ifCorrect]);
    setAnswersObj();
    props.setAnswers(answersObj);
  };
  const setAnswersObj = () => {
    const answerObj = [];
    for (let i = 0; i < answerField.length; i++) {
      answerObj.push({
        answer: answerField[i],
        correct: ifCorrect[i],
      });
    }
    answersObj = answerObj;
  };

  return (
    <>
      {answerField.map((answer, index) => {
        console.log('answer: ' + answer);
        return (
          <>
            <TextField
              id={'answer' + index}
              label={`Answer ${index + 1}`}
              multiline
              value={answer}
              onChange={(event) => handleAnswersChange(event, index)}
              margin='normal'
            />
            <Checkbox
              id={'tickBox' + index}
              checked={ifCorrect[index]}
              onChange={(event) => handleIfCorrectChange(event, index)}
              value='ifCorrect'
              color='primary'
            />
            <Button id={'removeBtn' + index} onClick={() => removeAnswer(index)}>
              Remove
            </Button>
            <br />
          </>
        );
      })}
      <Button id={'addBtn'} onClick={addAnswer}>
        + Add Answer
      </Button>
    </>
  );
};

export default AnswerFields;

AnswerFields.propTypes = {
  answers: PropTypes.array,
  setAnswers: PropTypes.func
};
