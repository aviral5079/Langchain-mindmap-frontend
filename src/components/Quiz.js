import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { resetNodeQuestions } from "../actions/nodeDetailsActions";
import { Input } from "@chakra-ui/react";
import QuizForm from "./QuizForm";

const Quiz = ({ questions, nodeQuestionsType, questionsError }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [choices, setChoices] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [showCheckButton, setShowCheckButton] = useState(false);

  const dispatch = useDispatch();
<<<<<<< HEAD
  const startQuiz = () => {
    if (nodeQuestionsType !== "oneword")
      if (Object.keys(questions[0].options).length === 2) {
        for (let i = 0; i < questions.length; i++) {
          questions[i].correct = questions[i].correct === "True" ? "a" : "b";
        }
      }
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowNextButton(false);
    setShowCheckButton(false);
=======

  const startQuiz = () => {
    if (Object.keys(questions[0].options).length == 2) {
      for (let i = 0; i < questions.length; i++) {
        questions[i].correct = questions[i].correct === "True" ? "a" : "b";
      }
    }
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowNextButton(false);
>>>>>>> 570770fc5d120965aafddb41806940091ae2b02b
    showQuestion(0);
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
    setCorrectAnswer("");
    setSelectedAnswer("");
  };

  const resetQuiz = () => {
    dispatch(resetNodeQuestions());
  };

  const selectChoice = (option) => {
    let tempSelectedAnswer = selectedAnswer;
    if (nodeQuestionsType === "mcq" || nodeQuestionsType === "tf") {
      tempSelectedAnswer = option;
    } else if (nodeQuestionsType === "maq") {
      if (selectedAnswer.includes(option)) {
        tempSelectedAnswer = tempSelectedAnswer.replace(option, "");
      } else {
        tempSelectedAnswer += option;
        tempSelectedAnswer = tempSelectedAnswer.split("").sort().join("");
      }
    }

    setSelectedAnswer(tempSelectedAnswer);
    if (tempSelectedAnswer.length > 0) {
      setShowCheckButton(true);
    } else {
      setShowCheckButton(false);
    }
  };

  const calculateScore = (selectedAnswer, correctAnswer) => {
    const tempSelectedAnswer = selectedAnswer.toLowerCase().trim();
    if (nodeQuestionsType === "oneword") {
      if (tempSelectedAnswer === correctAnswer.toLowerCase().trim()) {
        return 1;
      } else {
        return 0;
      }
    }

    const len1 = selectedAnswer.length;
    const len2 = correctAnswer.length;
    let x = 0,
      y = 0;
    let tempScore = 0;
    while (x < len1 && y < len2) {
      const sOption = selectedAnswer[x];
      const cOption = correctAnswer[y];

      if (sOption === cOption) {
        tempScore++;
        x++;
        y++;
      } else if (sOption < cOption) {
        return 0;
      } else {
        x++;
      }

      if (y === len2 && x < len1) return 0;
    }

    return tempScore / len2;
  };

  const handleCheckButton = () => {
    const tempScore = calculateScore(selectedAnswer, correctAnswer);
    setScore(score + tempScore);
    setShowNextButton(true);
    setShowCheckButton(false);
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
        {nodeQuestionsType === "oneword" ? (
          currentQuestionIndex <= questions.length - 1 ? (
            <div className="oneword-input-fields">
              <div className="input-answer-field">
                <Input
                  className={`${
                    !showCheckButton && showNextButton
                      ? selectedAnswer === correctAnswer
                        ? "correct-input"
                        : "incorrect-input"
                      : ""
                  }`}
                  pr="4.5rem"
                  type="text"
                  placeholder="write one word answer"
                  disabled={!showNextButton ? false : true}
                  value={selectedAnswer}
                  onChange={(e) => {
                    setSelectedAnswer(e.target.value);
                    if (e.target.value.length > 0) {
                      setShowCheckButton(true);
                    } else {
                      setShowCheckButton(false);
                    }
                  }}
                />
              </div>
              {!showCheckButton && showNextButton ? (
                <div className="correct-answer-field">
                  <Input
                    pr="4.5rem"
                    type="text"
                    disabled={true}
                    value={correctAnswer}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )
        ) : (
          <div id="answer-buttons">
            {Object.keys(choices).map((key) => (
              <button
                key={key}
                className={`btn ${
                  !showCheckButton && showNextButton
                    ? selectedAnswer.includes(key) &&
                      correctAnswer.includes(key)
                      ? "correct selected"
                      : correctAnswer.includes(key)
                      ? "correct"
                      : selectedAnswer.includes(key)
                      ? "incorrect selected"
                      : ""
                    : showCheckButton && !showNextButton
                    ? selectedAnswer.includes(key)
                      ? "selected"
                      : ""
                    : ""
                }`}
                onClick={() => selectChoice(key)}
                aria-label={choices[key]}
                disabled={!showNextButton ? false : true}
              >
                {choices[key]}
              </button>
            ))}
          </div>
        )}
        {currentQuestionIndex !== questions.length ? (
          <button
            disabled={showCheckButton ? false : true}
            id="check-button"
            onClick={handleCheckButton}
          >
            Check
          </button>
        ) : (
          ""
        )}
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
  nodeQuestionsType: nodeDetails.nodeQuestionsType,
  questions: nodeDetails.questions,
  questionsError: nodeDetails.questionsError,
});

export default connect(mapStateToProps)(Quiz);
