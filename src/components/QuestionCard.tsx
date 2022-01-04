import React from 'react'
import { AnswerObject } from '../App'
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  qNum: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    qNum,
    totalQuestions
  }) => (
  <Wrapper>
    <p className='number'>
      Question: {qNum} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question}}></p>
    <div>
      {answers.map(answer => (
        <ButtonWrapper
          key={answer}
          isCorrect={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
          >
          <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html: answer}}></span>
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;