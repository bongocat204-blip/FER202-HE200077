import React, { useReducer } from "react";

// Khởi tạo initialState theo yêu cầu bài tập
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
};

// Hàm reducer quản lý trạng thái Quiz
function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return {
        ...state,
        selectedOption: action.payload,
      };

    case "NEXT_QUESTION": {
      const isCorrect =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      const nextScore = isCorrect ? state.score + 1 : state.score;
      const isLastQuestion =
        state.currentQuestion + 1 >= state.questions.length;

      return {
        ...state,
        score: nextScore,
        selectedOption: "",
        currentQuestion: isLastQuestion
          ? state.currentQuestion
          : state.currentQuestion + 1,
        showScore: isLastQuestion,
      };
    }

    case "RESTART_QUIZ":
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const handleOptionSelect = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: option });
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  const currentQ = state.questions[state.currentQuestion];

  return (
    <div
      style={{
        backgroundColor: "#282c34",
        color: "#fff",
        padding: "30px",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "20px auto",
        textAlign: "center",
      }}
    >
      <h3>Bài 2: Question Bank</h3>

      {state.showScore ? (
        <div>
          <h1>
            Your Score: {state.score}/{state.questions.length}
          </h1>
          <button
            onClick={handleRestartQuiz}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              cursor: "pointer",
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h2>Question {state.currentQuestion + 1}</h2>
          <h3>{currentQ.question}</h3>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              margin: "20px 0",
            }}
          >
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                style={{
                  padding: "10px 15px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor:
                    state.selectedOption === option ? "#61dafb" : "#fff",
                  color: "#000",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={!state.selectedOption}
            style={{
              padding: "8px 20px",
              fontSize: "16px",
              cursor: state.selectedOption ? "pointer" : "not-allowed",
              opacity: state.selectedOption ? 1 : 0.5,
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionBank;
