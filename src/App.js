//import MovieRootPage from './MoveRatintImdb/MovieRootPage';
import './App.css';
//import RootCreate from './Pagination/RootCreate';
// import data from './ToDoApp/Data';
// import ToDoMainComponent from './ToDoApp/ToDoMainComponent';
//import ParentComponent from './UseState/ParentComponent';
//import UseEffectWithParent from './UseEffect/UseEffectWithParent';
// import ContextProvider from './ThemeContext/ContextProvider'
// import { configureStore } from "@reduxjs/toolkit";
// import DashBoardComponent from './ToolKit/DashBoardComponent.js';
// import loginReducer from "./ToolKit/loginReducer.js";
// import { Provider } from "react-redux";
// import LoginComponent from './ToolKit/LoginComponent.js';
// import PendingTasksFun from './ToolKit/PendingTasksFun.js';
// import CompletedItems from './ToolKit/CompletedItems.js';
// import My from './UseState/h.js';
import HomePage from './online-assessment-project/HomePage/HomePage.js';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminSignUp from './online-assessment-project/AdmimSignIn/AdminSignIn.js';
import AdminLogin from './online-assessment-project/AdminLogin/AdminLogin.js';
import AdminDashBoardFunction from './online-assessment-project/AdminDashBoard/AdminDashBoardFunctional.js';
import UserSignIn from './online-assessment-project/UserSignIn/UserSignUp.js';
import UserLogin from './online-assessment-project/UserLogIn/UserLogin.js';
import UserDashboardFunction from './online-assessment-project/UserDashBoard/UserDashBoard.js';
// const store = configureStore(
//   {
//     reducer: loginReducer
//   }
// )
import CreateQuiz from './online-assessment-project/CreateQuiz/CreateQuiz.js';
import Language from './online-assessment-project/Languages/Language.js';
import Qs from './online-assessment-project/VewResult/ViewResult.js';
function App() {

  return (
    // <div className="App">
    //  {/* <ParentComponent></ParentComponent> */}
    //  <UseEffectWithParent></UseEffectWithParent>
    // </div>
    <>
      {/* //<MovieRootPage></MovieRootPage> */}
      {/* <RootCreate></RootCreate> */}
      {/* <ToDoMainComponent alldata={data}></ToDoMainComponent> */}
      {/* //<ContextProvider></ContextProvider> */}
      {/* <Provider store={store}>
        <LoginComponent></LoginComponent>
        <DashBoardComponent></DashBoardComponent>
        <PendingTasksFun></PendingTasksFun>
        <CompletedItems></CompletedItems>
      </Provider> */}
      {/* <My></My> */}
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route component={NotFound} /> */}
          <Route path="/" element={<HomePage></HomePage>}> </Route>
          <Route path="/adminSignUp" element={<AdminSignUp></AdminSignUp>}></Route>
          <Route path="/adminLogin" element={<AdminLogin></AdminLogin>}></Route>
          <Route path="/adminDashBoard/:username/:id" element={<AdminDashBoardFunction></AdminDashBoardFunction>}></Route>
          <Route path="/createQuiz/:qs1/:language/:adminId" element={<CreateQuiz></CreateQuiz>}></Route>
          <Route path="/userSignIn" element={<UserSignIn></UserSignIn>}></Route>
          <Route path="/userLogin" element={<UserLogin></UserLogin>}></Route>
          <Route path="/userDashBoard/:name/:userId" element={<UserDashboardFunction></UserDashboardFunction>}></Route>
          <Route path="/language/:langName/:adminId/:UserId" element={<Language></Language>}></Route>
          <Route path="/Qs" element={<Qs></Qs>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}
//language

export default App;
