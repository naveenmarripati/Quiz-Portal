import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./CreateQuiz.css";

function CreateQuiz() {
  const params = useParams();
  const { qs1, language, adminId } = params;
  console.log("idididididi", adminId);
  const [question, setquestion] = useState("");
  const [ans1, setans1] = useState("");
  const [ans2, setans2] = useState("");
  const [ans3, setans3] = useState("");
  const [ans4, setans4] = useState("");
  const [correctans, setcorrectans] = useState();

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionerror, setquestionerror] = useState();
  const [ans1error, setans1error] = useState();
  const [ans2error, setans2error] = useState();
  const [ans3error, setans3error] = useState();
  const [ans4error, setans4error] = useState();
  const [correctanserror, setcorrectanserror] = useState();
  const [questionNumer, setQuestionNumber] = useState(1);

  const [isture, setistrue] = useState(false);
  const handleChange = (e, keyword) => {
    e.preventDefault();
    if (keyword === "qs") {
      setquestion(e.target.value);
    }
    if (keyword === "ans1") {
      setans1(e.target.value);
    }
    if (keyword === "ans2") {
      setans2(e.target.value);
    }
    if (keyword === "ans3") {
      setans3(e.target.value);
    }
    if (keyword === "ans4") {
      setans4(e.target.value);
    }
    if (keyword === "correct") {
      setcorrectans(e.target.value);
    }
  };
  let count = Number(qs1);

  const handelClick = (e) => {
    if (questionNumer <= count) {
      if (question && ans1 && ans2 && ans3 && ans2 && correctans) {
        console.log("you");
        const newQuestion = {
          question: question,
          answers: [ans1, ans2, ans3, ans4],
          correctAnswer: correctans,
        };
        setQuizQuestions((prev) => [...prev, newQuestion]);

        setQuestionNumber(questionNumer + 1);
        setistrue(true);
        axios
          .patch(`http://localhost:3001/AdminDetails/${adminId}`, {
            quizQuestions: {
              languageName: language,
              questionsList: [...quizQuestions, newQuestion],
            },
          })
          .then((res) => console.log(ans2))
          .catch((e) => console.log(e));
      } else {
        if (!question) {
          setquestionerror("Please Enter the Question");
        } else {
          setquestionerror("");
        }
        if (!ans1) {
          setans1error("Please ans1");
        } else {
          setans1error("");
        }
        if (!ans2) {
          setans2error("Please ans2");
        } else {
          setans2error("");
        }
        if (!ans3) {
          setans3error("Please ans3");
        } else {
          setans3error("");
        }
        if (!ans4) {
          setans4error("Please ans4");
        } else {
          setans4error("");
        }
        if (!correctans) {
          setcorrectanserror("please enter the correct answer");
        } else {
          setcorrectanserror("");
        }
      }
    } else {
      // console.log("You are completer your questions")
      // // clearInterval(clear)
      // console.log("hii")
    }
  };

  const finish = (e) => {
    e.preventDefault();
    setistrue(false);
    setquestion("");
    setans1("");
    setans2("");
    setans3("");
    setans4("");
    setcorrectans("");
  };

  return (
    <>
      {isture ? (
        <>
          <div className="main-container">
            <h1 className="success-heading">You have Successfully created!</h1>
            <button className="button" onClick={(e) => finish(e)}>
              Clear
            </button>
          </div>{" "}
        </>
      ) : questionNumer <= count ? (
        <>
          <h1>Question Number {questionNumer}</h1>
          <div className="inputContainer">
            <div>
              <lable htmlFor="qs">Enter the Question:</lable>
              <input type="text" onChange={(e) => handleChange(e, "qs")} />
              <p>{questionerror}</p>
            </div>
            <div>
              <lable htmlFor="ans1">Option1</lable>
              <input type="text" onChange={(e) => handleChange(e, "ans1")} />
              <p>{ans1error}</p>
            </div>
            <div>
              <lable htmlFor="ans2">Option2</lable>
              <input type="text" onChange={(e) => handleChange(e, "ans2")} />
              <p>{ans2error}</p>
            </div>
            <div>
              <lable htmlFor="ns3">Option3</lable>
              <input type="text" onChange={(e) => handleChange(e, "ans3")} />
              <p>{ans3error}</p>
            </div>
            <div>
              <lable htmlFor="ans4">Option4</lable>
              <input type="text" onChange={(e) => handleChange(e, "ans4")} />
              <p>{ans4error}</p>
            </div>
            <div>
              <lable htmlFor="correctans">Correct Answer:</lable>
              <input type="text" onChange={(e) => handleChange(e, "correct")} />
              <p>{correctanserror}</p>
            </div>
            <div>
              <button onClick={(e) => handelClick(e)}>Next Question</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>All questions have been created!</h1>
        </>
      )}
    </>
  );
}

export default CreateQuiz;