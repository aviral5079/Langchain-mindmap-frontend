import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { resetNodeQuestions } from "../actions/nodeDetailsActions";
import QuizForm from "./QuizForm";
import "../styles/Quiz.scss";

const Quiz = ({ questions, questionsError }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [choices, setChoices] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const dispatch = useDispatch();

  // console.log(questions);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowNextButton(false);
    showQuestion(0);

    if (Object.keys(questions[0].options).length == 2) {
      for (let i = 0; i < questions.length; i++) {
        questions[i].correct = questions[i].correct === "True" ? "a" : "b";
      }

      console.log(questions);
    }
  };

  const showQuestion = (index) => {
    resetState();
    let currentQuestion = questions[index];
    let questionNumber = index + 1;
    setQuestionNumber(questionNumber);
    setQuestionText(`${questionNumber}. ${currentQuestion.question}`);
    setChoices(currentQuestion.options);
    setCorrectAnswer(currentQuestion.correct);
  };

  const resetState = () => {
    setChoices({});
    setCorrectAnswer(null);
    setSelectedAnswer(null);
  };

  const resetQuiz = () => {
    dispatch(resetNodeQuestions());
  };

  const selectChoice = (isCorrect, index) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedAnswer(index);
    setShowNextButton(true);
  };

  const handleNextButton = () => {
    setShowNextButton(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex < questions.length - 1) {
      showQuestion(currentQuestionIndex + 1);
    } else if (currentQuestionIndex === questions.length - 1) {
      showScore();
    } else {
      resetQuiz();
    }
  };

  const showScore = () => {
    resetState();
    setQuestionText(`You scored ${score} out of ${questions.length}!`);
    setShowNextButton(true);
  };

  useEffect(() => {
    if (questions.length > 0) startQuiz();
  }, [questions]);

  if (questions.length === 0) {
    return (
      <div className="quiz-form">
        <QuizForm />
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Quiz</h1>
        {questionNumber} out of {questions.length}
      </div>
      <div className="quiz">
        <h2 id="question">{questionText}</h2>
        <div id="answer-buttons">
          {Object.keys(choices).map((key) => (
            <button
              key={key}
              className={`btn ${
                selectedAnswer === key
                  ? selectedAnswer === correctAnswer
                    ? "correct"
                    : "incorrect"
                  : selectedAnswer && correctAnswer === key
                  ? "correct-answer"
                  : ""
              }`}
              onClick={() => selectChoice(key === correctAnswer, key)}
              aria-label={choices[key]}
              disabled={selectedAnswer !== null}
            >
              {choices[key]}
            </button>
          ))}
        </div>
        {
          <button
            disabled={showNextButton ? false : true}
            id="next-button"
            onClick={handleNextButton}
          >
            {currentQuestionIndex === questions.length
              ? "Reset"
              : currentQuestionIndex === questions.length - 1
              ? "Get Score"
              : "Next"}
          </button>
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({ nodeDetails }) => ({
  questions: nodeDetails.questions,
  questionsError: nodeDetails.questionsError,
});

export default connect(mapStateToProps)(Quiz);
