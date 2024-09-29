import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Languages.css"
function Language() {
    const [adminData, setAdminData] = useState(null); // Admin data state
    const [questions, setQuestions] = useState([]); // Questions array
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Selected answers for each question
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index
    const [score, setScore] = useState(0); // Track score
    const [showScore, setShowScore] = useState(false); // Show score at the end
    const [timeLeft, setTimeLeft] = useState(15); // 15-second timer
    const [isQuizComplete, setIsQuizComplete] = useState(false); // Flag to check if quiz is finished
    const params = useParams();
    const { langName, adminId, UserId } = params; // Extract langName and adminId from params

    useEffect(() => {
        axios
            .get(`http://localhost:3001/AdminDetails/${adminId}`)
            .then((res) => {
                setAdminData(res.data);
                if (res.data.quizQuestions) {
                    setQuestions(res.data.quizQuestions.questionsList); // Set the questions array
                }
            })
            .catch((error) => console.log(error));
    }, [adminId]); // Dependency on adminId

    // Function to handle moving to the next question
    const moveToNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;

        // Check if an answer is selected and update score
        if (
            selectedAnswers[currentQuestionIndex] ===
            questions[currentQuestionIndex].correctAnswer
        ) {
            setScore((prevScore) => prevScore + 1); // Increment score if answer is correct
        }

        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex); // Go to the next question
            setTimeLeft(15); // Reset the timer for the next question
        } else {
            setShowScore(true);
            setIsQuizComplete(true) // Show the score if no more questions
        }
    };

    // Timer countdown using useEffect
    useEffect(() => {
        if (isQuizComplete) return; // Stop the timer if the quiz is complete

        if (timeLeft === 0) {
            moveToNextQuestion(); // Automatically move to the next question when time runs out
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer); // Clear the timer on component unmount
    }, [timeLeft, isQuizComplete]);

    if (!adminData || questions.length === 0) {
        return <p>Loading quiz data...</p>; // Render a loading message
    }
    if (!adminData || questions.length === 0) {
        return <p>Loading quiz data...</p> // Render a loading message
    }

    if (showScore) {
        if (!isQuizComplete) {
            axios
                .patch(`http://localhost:3001/userDetails/${UserId}`, {
                    score: `${score}/ ${questions.length}`,
                })
                .then((res) => {
                    console.log("user", UserId);
                })
                .catch((error) => console.log(error));
        } else {
            axios
                .patch(`http://localhost:3001/userDetails/${UserId}`, {
                    score: `${score}/ ${questions.length}`,
                    langName: langName,
                })
                .then((res) => {
                    console.log("user", UserId);
                })
                .catch((error) => console.log(error));
        }

        return (
            <h3>
                Your Final Score: {score} / {questions.length}
            </h3>
        ); // Show score at the end
    }


const currentQuestion = questions[currentQuestionIndex]; // Get the current question

return (
    <>
        <h1>Language: {langName}</h1>
        <div className="languageContainer">
            <h2>
                Question {currentQuestionIndex + 1}: {currentQuestion.question}
            </h2>
            {currentQuestion.answers.map((answer, answerIndex) => (
                <div key={answerIndex}>
                    <label>
                        <input
                            type="radio"
                            name={`question-${currentQuestionIndex}`}
                            value={answer}
                            checked={selectedAnswers[currentQuestionIndex] === answer}
                            onChange={() =>
                                setSelectedAnswers({
                                    ...selectedAnswers,
                                    [currentQuestionIndex]: answer,
                                })
                            }
                        />
                        {answer}
                    </label>
                </div>
            ))}

            {/* Timer display */}
            <p style={{ color: "blue" }}>Time Left: {timeLeft} seconds</p>

            {/* Next button */}
            <button onClick={moveToNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
            </button>
        </div>
    </>
);
}

export default Language;