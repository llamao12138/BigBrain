import { shallow } from 'enzyme';
import React from 'react';
import LoginForm from './components/LoginForm';
import Card from './components/Card';
import AnswerFields from './components/AnswerFields';
import Question from './components/Question';
import StartGamePopup from './components/StartGamePopup';

const noop = () => {};

describe('<LoginForm>', () => {
  it('have a field for email and password', () => {
    const wrapper = shallow(<LoginForm login={noop} goRegister={noop} />);

    expect(wrapper.find('input[type="email"]')).toHaveLength(1);
    expect(wrapper.find('input[type="password"]')).toHaveLength(1);
  });

  it('has a LogIn button, which can be clicked', () => {
    const login = jest.fn();
    const wrapper = shallow(<LoginForm login={login} goRegister={noop} />);
    expect(wrapper.find('button[type="login"]')).toHaveLength(1);

    wrapper.find('button[type="login"]').simulate('click');
    expect(login).toHaveBeenCalledTimes(1);
  });

  it('has a button which leads to register page', () => {
    const reg = jest.fn();
    const wrapper = shallow(<LoginForm login={noop} goRegister={reg} />);
    expect(wrapper.find('button[type="register"]')).toHaveLength(1);
    wrapper.find('button[type="register"]').simulate('click');
    expect(reg).toHaveBeenCalledTimes(1);
  });

  it('requires the email and password to be filled before submitting', () => {
    const wrapper = shallow(<LoginForm login={noop} goRegister={noop} />);

    const emailInput = wrapper.find('input[type="email"]');
    expect(emailInput.prop('aria-required')).toBe('true');

    const passwordInput = wrapper.find('input[type="password"]');
    expect(passwordInput.prop('aria-required')).toBe('true');
  });

  it('has labels for the input fields', () => {
    const wrapper = shallow(<LoginForm login={noop} goRegister={noop} />);

    const emailInputId = wrapper.find('input[type="email"]').prop('id');
    const passwordInputId = wrapper.find('input[type="password"]').prop('id');

    expect(emailInputId).not.toBe(passwordInputId);

    expect(wrapper.find(`label[htmlFor='${emailInputId}']`)).toHaveLength(1);
    expect(wrapper.find(`label[htmlFor='${passwordInputId}']`)).toHaveLength(1);
  });

  it('should call login function when the login button is clicked', () => {
    const inputEmail = 'potato@email.com';
    const inputPassword = 'potato';

    const mockLogin = jest.fn();

    const wrapper = shallow(<LoginForm login={mockLogin} goRegister={noop} />);

    const emailInput = wrapper.find('input[type="email"]');
    emailInput.simulate('change', { target: { value: inputEmail } });

    const passwordInput = wrapper.find('input[type="password"]');
    passwordInput.simulate('change', { target: { value: inputPassword } });

    wrapper.find('button[type="login"]').simulate('click');

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith(inputEmail, inputPassword);
  });
});

describe('Card', () => {
  it('has quiz title', () => {
    const data = {
      id: 'shrek',
      name: 'shrekQuiz',
    };
    const wrapper = shallow(
      <Card quiz={data} toEdit={noop} getResults={noop} />
    );
    expect(wrapper.find('#title')).toHaveLength(1);
    // expect(wrapper.find('button[type='login']')).toHaveLength(1)
    expect(wrapper.find('#title').html()).toContain(data.id);
  });

  it('has an outside card', () => {
    const data = {
      id: 'shrek',
      name: 'shrekQuiz',
    };
    const wrapper = shallow(
      <Card quiz={data} toEdit={noop} getResults={noop} />
    );
    expect(wrapper.find('#outsideCard')).toHaveLength(1);
  });

  it('has a button to edit quiz', () => {
    const data = {
      id: 'shrek',
      name: 'shrekQuiz',
    };
    const mock = jest.fn();
    const wrapper = shallow(
      <Card quiz={data} toEdit={mock} getResults={noop} />
    );

    wrapper.find('#toEdit').simulate('click');
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('has a button that says click to start game, that when clicked, changes text', () => {
    const data = {};
    const wrapper = shallow(
      <Card quiz={data} toEdit={noop} getResults={noop} />
    );
    expect(wrapper.find('#startOrEndBtn')).toHaveLength(1);
    expect(wrapper.find('#startOrEndBtn').html()).toContain('Start');
    wrapper.find('#startOrEndBtn').simulate('click');
    expect(wrapper.find('#startOrEndBtn').html()).toContain('End');

    //  expect({originalText}).toEqual(expect.not.stringMatching({newText}))
    //  console.log(newText)
  });
});

describe('AnswerFields', () => {
  it('has the same numnber of text fields and tick boxes as there are answers', () => {
    let answers = [
      { answer: 'good', correct: true },
      { answer: 'bad', correct: false },
      { answer: 'ok', correct: false },
    ];
    const wrapper = shallow(
      <AnswerFields answers={answers} setAnswers={noop} />
    );
    expect(wrapper.find('#answer0')).toHaveLength(1);
    expect(wrapper.find('#tickBox0')).toHaveLength(1);

    expect(wrapper.find('#answer1')).toHaveLength(1);
    expect(wrapper.find('#tickBox1')).toHaveLength(1);

    expect(wrapper.find('#answer2')).toHaveLength(1);
    expect(wrapper.find('#tickBox2')).toHaveLength(1);

    answers = [];
    const wrapper2 = shallow(
      <AnswerFields answers={answers} setAnswers={noop} />
    );
    expect(wrapper2.find('#answer')).toHaveLength(0);
    expect(wrapper2.find('#tickBox')).toHaveLength(0);
  });

  it('text field displays answer passed in', () => {
    const answers = [
      { answer: 'good', correct: true },
      { answer: 'bad', correct: false },
    ];
    const wrapper = shallow(
      <AnswerFields answers={answers} setAnswers={noop} />
    );
    expect(wrapper.find('#answer0').at(0).html()).toContain('good');
    expect(wrapper.find('#answer1').at(0).html()).toContain('bad');
  });

  it('shows boxes ticked if correct', () => {
    const answers = [{ answer: 'good', correct: true }];
    const wrapper = shallow(
      <AnswerFields answers={answers} setAnswers={noop} />
    );
    expect(wrapper.find('#tickBox0').at(0).props().checked).toBe(true);
  });

  it('shows boxes not ticked if incorrect', () => {
    const answers = [{ answer: 'good', correct: false }];
    const wrapper = shallow(
      <AnswerFields answers={answers} setAnswers={noop} />
    );
    expect(wrapper.find('#tickBox0').at(0).props().checked).toBe(false);
  });

  it('add a field when add button is clicked', () => {
    const answers = [{ answer: 'good', correct: false }];
    const wrapper = shallow(
      <AnswerFields answers={answers} setAnswers={noop} />
    );
    expect(wrapper.find('#answer0')).toHaveLength(1);
    expect(wrapper.find('#tickBox0')).toHaveLength(1);
    wrapper.find('#addBtn').simulate('click');
    expect(wrapper.find('#answer1')).toHaveLength(1);
    expect(wrapper.find('#tickBox1')).toHaveLength(1);
    expect(wrapper.find('#answer0')).toHaveLength(1);
    expect(wrapper.find('#tickBox0')).toHaveLength(1);
  });

  it('has a remove button which can be clicked to remove an answer', () => {
    const answers = [{ answer: 'good', correct: false }];
    const wrapper = shallow(
      <AnswerFields answers={answers} setAnswers={noop} />
    );
    expect(wrapper.find('#answer0')).toHaveLength(1);
    expect(wrapper.find('#tickBox0')).toHaveLength(1);
    wrapper.find('#removeBtn0').simulate('click');
    expect(wrapper.find('#answer0')).toHaveLength(0);
    expect(wrapper.find('#tickBox0')).toHaveLength(0);
  });

  it('has tick boxes which will change state when clicked', () => {
    const answers = [{ answer: 'good', correct: false }];
    const wrapper = shallow(
      <AnswerFields answers={answers} setAnswers={noop} />
    );
    const tickBox = wrapper.find('#tickBox0');
    expect(tickBox.props().checked).toBe(false);
    tickBox.simulate('change', { target: { checked: true } });
  });
});

describe('Question', () => {
  it('contains question filed', () => {
    const wrapper = shallow(<Question data question />);
    const questionSpot = wrapper.find('#questionId');
    expect(questionSpot).toHaveLength(1);

    expect(questionSpot.html()).toContain('Question');
  });

  it('has two options in dropdown select', () => {
    const wrapper = shallow(<Question data question />);
    const options = wrapper.find('option');
    expect(options).toHaveLength(2);
  });

  it('has duration field', () => {
    const wrapper = shallow(<Question data question />);
    const durationText = wrapper.find('#duration');
    expect(durationText).toHaveLength(1);
  });

  it('shows duration', () => {
    const wrapper = shallow(
      <Question
        questionID= {123}
        questionType='banana'
        duration='10'
        points='0'
        question={{ question: 'BANANA' }}
      />
    );
    const durationText = wrapper.find('#duration');
    expect(durationText.html()).toContain(10);
  });

  it('shows question', () => {
    const wrapper = shallow(
      <Question
        questionID={123}
        questionType='banana'
        duration='10'
        points= '0'
        question={{ question: 'BANANA' }}
      />
    );
    const questionText = wrapper.find('#question');
    expect(questionText.html()).toContain('BANANA');
  });

  it('shows points', () => {
    const wrapper = shallow(
      <Question
        questionID={123}
        questionType='banana'
        duration='10'
        points='8'
        question={{ question: 'BANANA' }}
      />
    );
    const questionText = wrapper.find('#points');
    expect(questionText.html()).toContain(8);
  });
});

describe('StartGamePopup', () => {
  it('has a button to share link, which can be clicked', () => {
    const mockHandleClicky = jest.fn();
    const wrapper = shallow(
      <StartGamePopup
        sessionId='hi'
        handleCloseSessionId={noop}
        openSessionId={12}
        manageGame={noop}
        handleClick={mockHandleClicky}
      />
    );
    expect(wrapper.find('#shareBtn')).toHaveLength(1);

    wrapper.find('#shareBtn').simulate('click');
    expect(mockHandleClicky).toHaveBeenCalledTimes(1);
  });

  it('has a button to advance game, which can be clicked', () => {
    const mockHandleClicky = jest.fn();
    const wrapper = shallow(
      <StartGamePopup
        sessionId='hi'
        handleCloseSessionId={noop}
        openSessionId={12}
        manageGame={mockHandleClicky}
        handleClick={noop}
      />
    );
    expect(wrapper.find('#manageGameBtn')).toHaveLength(1);

    wrapper.find('#manageGameBtn').simulate('click');
    expect(mockHandleClicky).toHaveBeenCalledTimes(1);
  });

  it('has a session id, which was passed in', () => {
    const wrapper = shallow(
      <StartGamePopup
        sessionId='hi'
        handleCloseSessionId={noop}
        openSessionId={12}
        manageGame={noop}
        handleClick={noop}
      />
    );
    expect(wrapper.find('#sessionId')).toHaveLength(1);
    expect(wrapper.find('#sessionId').html()).toContain('hi');
  });

  it('has a button to close game, which can be clicked', () => {
    const mockHandleClicky = jest.fn();
    const wrapper = shallow(
      <StartGamePopup
        sessionId='hi'
        handleCloseSessionId={mockHandleClicky}
        openSessionId={noop}
        manageGame={noop}
        handleClick={noop}
      />
    );
    expect(wrapper.find('#closeBtn')).toHaveLength(1);

    wrapper.find('#closeBtn').simulate('click');
    expect(mockHandleClicky).toHaveBeenCalledTimes(1);
  });
});
