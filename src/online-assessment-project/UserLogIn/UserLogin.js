import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UserLogin.css';
function UserLogin() {
  const [adminData, setadminData] = useState([])
  const [errorBox, seterrorBox] = useState()
  const [errorPassword, seterrorPassword] = useState()
  const [passwordVisible, setpasswordVisible] = useState(false)
  const [errorName, seterrorName] = useState()
  const [name, setName] = useState()
  const [email, setemail] = useState("")
  const [errorEmail, seterrorEmail] = useState("")

  const [password, setPassword] = useState()


  const [adminPhoto, setAdminPhoto] = useState()

  const [image, setImage] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3001/userDetails")
      .then((res) => {
        setadminData(res.data);
        console.log("res", res.data)
      })
      .catch((error) => console.log(error));
  }, []);


  const handleChange = (e, keyword) => {
    if (keyword === "name") {
      setName(e.target.value);
      //console.log(e.target.value)
    } else if (keyword === "password") {
      setPassword(e.target.value);
    } else if (keyword === "email") {
      setemail(e.target.value)
    }
    else if (keyword === "photo") {
      console.log(e.target.files)
      const file = e.target.files[0]
      setAdminPhoto(e.target.files[0])
    }
  }
  const handleClick = (e) => {
    e.preventDefault()
    adminPhoto && setImage(URL.createObjectURL(adminPhoto))

    if (
      name &&
      password &&
      errorName === "" &&
      errorPassword === "" &&
      email &&
      errorEmail === ""
    ) {
      const filteredResult = adminData.filter(
        (item) =>
          // console.log(item.adminname)
          // console.log(item.adminpassword)
          item.adminname === name &&
          item.adminpassword === password
      );
      console.log("filteredResult", filteredResult)

      if (filteredResult.length === 1) {
        console.log("filteredResult", filteredResult)
        if (
          filteredResult[0].adminname === name &&
          filteredResult[0].adminpassword === password
        ) {
          axios.patch(`http://localhost:3001/userDetails/${filteredResult[0].id}`,{
            image:image
          }).then((res)=>navigate(`/userDashBoard/${name}/${filteredResult[0].id}`)).catch((e)=>console.log(e))
        }
      } else {
        console.log("else part")
        const usernamechecking = adminData.some(
          (item) => item.adminname === name
        );
        const passwordchecking = adminData.some(
          (item) => item.adminpassword === password
        );

        if (usernamechecking === false && passwordchecking === true) {
          seterrorName("Please enter correct username");
        } else if (usernamechecking === true && passwordchecking === false) {
          seterrorPassword("Please enter the correct password");
        } else {
          navigate("/adminSignUp");
        }
      }
    } else {
      if (!name) {
        seterrorName("please enter the name");
      } else {
        seterrorName("");
      }
      if (!email) {
        seterrorEmail("please enter the password");
      } else {
        seterrorEmail("")
      }
      if (!password) {
        seterrorPassword("please enter the password");
      } else {
        seterrorPassword("")
      }


    }
  }
  const togglePasswordVisibility = () => {
    setpasswordVisible(!passwordVisible);
  }
  return (
    <div className="adminLoginContainer">
      <h1>User/Login</h1>
      <div>
        <div>
          <form>
            <div className="loginpage">
              <div className="form-container">
                {/* <h1 className="main-heading">Admin/Login</h1> */}
                <div>
                  <label className="heading" htmlFor="name">
                    Name :
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    onChange={(e) => handleChange(e, "name")}
                  />
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bolder",
                      fontSize: "18px",
                    }}
                  >
                    {errorName}
                  </p>
                </div>
                <div>
                  <label className="heading" htmlFor="email">
                    Email :
                  </label>
                  <br></br>
                  <input
                    type="text"
                    id="signupemail"
                    placeholder="Enter your email"
                    onChange={(e) => handleChange(e, "email")}
                  />
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bolder",
                      fontSize: "18px",
                    }}
                  >
                    {errorEmail}
                  </p>
                </div>
                <div>
                  <label className="heading" htmlFor="password">
                    Password :
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={passwordVisible ? "text" : "password"} // Step 3: Toggle input type
                      id="password"
                      placeholder="Enter your Password"
                      onChange={(e) => handleChange(e, "password")}
                    />
                    <span
                      onClick={togglePasswordVisibility} // Step 3: Add click handler
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                    </span>
                  </div>
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bolder",
                      fontSize: "18px",
                    }}
                  >
                    {errorPassword}
                  </p>
                </div>

                <div>
                  <label className="heading" htmlFor="file">
                    Choose Photo :
                  </label>
                  <br></br>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => handleChange(e, "photo")}
                  />
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bolder",
                      fontSize: "18px",
                    }}
                  >
                  </p>
                </div>

                <div>
                  <div className="checkbox">
                    <div>
                      <input
                        type="checkbox"
                        onChange={(e) => handleChange(e, "checkbox")}
                      />
                      <label className="checkboxtext"> Remember Me</label>
                    </div>
                  </div>
                  <p style={{ color: "red" }}>{errorBox}</p>
                </div>
                <div className="button-container">
                  <button
                    className="button"
                    onClick={(e) => handleClick(e)}
                  >
                    LogIn
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default UserLogin