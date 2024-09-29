
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
function UserDashboardFunction() {
    const params = useParams();
    console.log("params", params);
    const [adminData, setadminData] = useState([]);
    const [userData, setuserData] = useState([]);
    const [select, setselect] = useState(false);
    const [UserId, setUserId] = useState()
    useEffect(() => {
        axios
            .get("http://localhost:3001/AdminDetails")
            .then((res) => {
                setadminData(res.data);
                console.log("res", res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        axios
            .get("http://localhost:3001/userDetails")
            .then((res) => {
                setuserData(res.data);
                console.log("res user", res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    const id = params.userId;
    const filteredObject = userData.filter((item) => item.id === id);

    

    const navigate = useNavigate();

    const click = (e, keyword, userName) => {
        e.preventDefault();

        adminData.map((item) => {
            if (userName === item.adminname) {
                // navigate("/Qs")
                navigate(`/language/${keyword}/${item.id}/${id}`);
            }
        });
    };

    const userSelect = (e, userName) => {
        e.preventDefault();
        adminData.map((item1) => {
            if (!item1.quizQuestions) {
                const filteritems = adminData.filter((i) => !i.quizQuestions);
                filteritems.map((obj) => {
                    console.log(obj.id, "obj");
                    axios
                        .delete(`http://localhost:3001/AdminDetails/${obj.id}`)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error));
                });
            } else {
                if (item1.adminname === userName) {
                    setselect(item1.quizQuestions.languageName);
                }
                setselect(item1.quizQuestions.languageName);
            }
        });
    };
    return (
        <div className="adminDahsBoardContainer">
            <h1 className="adminDashBoardHeadning">  Welcome To User Dashboard </h1>
            <div className="adminCardsContainer">
                <div className="adminDetailsCardContainer">
                    {filteredObject.map((item) => (

                        <div>
                            {console.log("obj", filteredObject)}
                            {console.log("filteritem", item)}
                            <img src={item.image} className="adminImage" alt="no image" />
                            <p className="details">Name: {item.adminname}</p>
                            <p className="details">Email: {item.adminemail}</p>
                            <p className="details">PhoneNumber: {item.phonenumber}</p>
                        </div>
                    ))}
                </div>
                <div className="quizizzContainer">
                    <div>
                        {adminData.map((item) => (
                            <div>
                                <Popup
                                    trigger={
                                        <button
                                            style={{ width: 150, fontSize: 18,textDecoration:"underline", color:"blue"}}
                                            className="mcqbutton"
                                            onClick={(e) => userSelect(e)}
                                           
                                        >
                                            {item.adminname}
                                        </button>
                                    }
                                    position="bottom right"
                                >
                                    <div className="popupcontainer">
                                        <div>
                                            <Link to="/language">
                                                <button
                                                    style={{ width: 150, fontSize: 18 }}
                                                    className="mcqbutton"
                                                    onClick={(e) =>
                                                        click(
                                                            e,
                                                            item.quizQuestions.languageName,
                                                            item.adminname
                                                        )
                                                    }
                                                >
                                                    {item.quizQuestions.languageName}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </Popup>
                                
                            </div>
                        ))}

                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserDashboardFunction;