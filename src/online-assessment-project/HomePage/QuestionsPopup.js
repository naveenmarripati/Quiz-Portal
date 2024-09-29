import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./QuestionsPopup.css";

const QuestionsPopup = ({ open, onClose }) => {
  const questions = [
    {
      id: 1,
      question: "Which attribute is used to provide a unique name to an HTML element?",
      options: ["id", "class", "type", "none of the above"],
      answer: "Paris",
    },
    {
      id: 2,
      question: " How can we change the background color of an element?",
      options: ["background-color", "color", "both A and B ", "none of the above"],
      answer: "Mars",
    },
    // Add more questions as needed
  ];

  return (
    <Popup open={open} onClose={onClose} modal>
      <div className="popup-content">
        <h2>Demo Test Questions</h2>
        {questions.map((q) => (
          <div key={q.id} className="question-item">
            <p>{q.question}</p>
            <ul>
              {q.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Popup>
  );
};

export default QuestionsPopup;