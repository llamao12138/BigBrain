/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  let data = {'question': question.question}
  let possibleAnswers = []
  for (let i = 0; i < question.answers.length; i++){
    possibleAnswers.push(question.answers[i].answer)
  }
  data['answers'] = possibleAnswers
  data['duration'] = parseInt(question.duration)
  console.log(data)
  return data;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  const answers = question.answers;
  const correctAnswerIdx = answers.findIndex(answer => answer.correct);
  return [
    correctAnswerIdx
  ]; // For a single answer
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  const answers = question.answers;
  const correctAnswersIdx = answers.findIndex(answer => answer.correct);
  return [
    correctAnswersIdx
  ]; // For a single answer
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.duration;
};
