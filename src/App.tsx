import React, { useState } from 'react'
import { BooleanLiteral } from 'typescript';
import { fetchQuizQuestions, Difficulty, QuestionState } from './API';
// Components
import QuestionCard from './components/QuestionCard'
// Styles
import { Style, Wrapper } from './App.styles'

export type AnswerObject = {
  question: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions , setQuestions] = useState([] as QuestionState[]);
  const [number, setNumber] = useState(0);
  const [userAnswers , setUserAnswers] = useState([] as AnswerObject[]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions)

  const startTrivia = async() => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setNumber(0);
    setUserAnswers([]);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      // take user_answer
      const answer = e.currentTarget.value;
      // checl user_answer against correct_answer
      const isCorrect = questions[number].correct_answer === answer;

      if(isCorrect) setScore(prev => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        isCorrect,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev,answerObject])
    }
  }

  const nextQuestion = () => {
    
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
    <Style />
    <Wrapper>
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (<button className='start' onClick={startTrivia}>
        Start
      </button>) : null}
      {!gameOver ? (<p className='score'>
        Score: {score}
      </p>) : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver &&(<QuestionCard 
          qNum={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined }
          callback={checkAnswer}
      />)}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (<button className='next' onClick={nextQuestion}>
        Next Question
      </button>) : null}
    </Wrapper>
    </>
  );
}

export default App;