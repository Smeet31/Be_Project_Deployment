import {Route, Routes, Navigate} from "react-router-dom"
import HomePage from "./Components/homepage/homePage";
import Login from "./Components/loginpage/loginPage";
import Signup from "./Components/signuppage/signupPage";

function App() {
	// const user = localStorage.getItem("token")
    return (
		<HomePage/>
    //   <Routes>
	// 		{user && <Route path="/" exact element={<HomePage />} />}
	// 		<Route path="/signup" exact element={<Signup />} />
	// 		<Route path="/login" exact element={<Login />} />
	// 		<Route path="/" exact element={<Navigate replace to="/login" />} />
	// 	</Routes>
	)

}

export default App;
