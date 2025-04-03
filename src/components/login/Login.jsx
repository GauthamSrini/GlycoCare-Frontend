import React, { useState } from "react";
import "./login.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    let validationErrors = {};
    if (!username) validationErrors.username = "Username is required";
    if (!password) validationErrors.password = "Password is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/glycoCare/validateUser?username=${username}&password=${password}`
      );
      if (response.status === 200 && response.data.name) {
        toast.success(`Welcome ${response.data.name}!`, {
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          progressClassName: "custom-toast-progress-success",
          onClose: () => navigate("/dashboard"), // Navigate only after the toast is dismissed
        });
      } else if (response.status === 401) {
        toast.warn("invalid username or password", {
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          progressClassName: "custom-toast-progress",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.warn("invalid username or password", {
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          progressClassName: "custom-toast-progress",
        });
      } else {
        console.error("Error during login:", error);
        toast.warn("Error occured during Login. Try Again", {
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          progressClassName: "custom-toast-progress",
        });
      }
    }
  };

  const handleRegister = async () => {
    let validationErrors = {};
    if (!name) validationErrors.name = "name is required";
    if (!age) validationErrors.age = "age is required";
    if (!username) validationErrors.username = "Username is required";
    if (!password) validationErrors.password = "Password is required";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    try{
        const response = await axios.post(``);
    }
    catch(error){

    }
  }

  const handleSwitchs = () => {
    setErrors({});
    setIsLogin(!isLogin);
  };

  return (
    <div className="mainContainerLogin">
      <div className="BaseContainer">
        <div className="descripMainDiv">
          <div className="titleWelcome">
            Welcome To <span className="span">Glyco Care</span> . . .
          </div>
          <div className="descriptionDetailed">
            GlycoCare's goal is to give seniors a tailored, user-friendly
            platform for efficient blood sugar management. By combining
            personalized nutritional advice, real-time blood sugar monitoring,
            and medical support, the solution encourages better lives and gives
            seniors the tools they need to take charge of their own health with
            easily accessible technology.
          </div>
        </div>
        <div className="DetailsMainDiv">
          <div className="titleDetails">{isLogin ? "Login" : "SignUp"}</div>
          {isLogin ? (
            <div style={{ color: "gray" }}>
              Don't Have an Account{" "}
              <span className="sighnup" onClick={handleSwitchs}>
                SignUp
              </span>
            </div>
          ) : (
            <div style={{ color: "gray" }}>
              Fill up Your Details{" "}
              <span className="sighnup" onClick={handleSwitchs}>
                Login
              </span>
            </div>
          )}
          <form>
            {!isLogin && (
              <>
                <div className="inputDiv">
                  <div>Name</div>
                  <div>
                    <TextField
                      className="textField"
                      variant="outlined"
                      size="small"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </div>
                </div>
                <div className="inputDiv">
                  <div>Your Age</div>
                  <div>
                    <TextField
                      className="textField"
                      variant="outlined"
                      size="small"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      error={!!errors.age}
                      helperText={errors.age}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="inputDiv">
              <div>User Name</div>
              <div>
                <TextField
                  className="textField"
                  variant="outlined"
                  size="small"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </div>
            </div>
            <div className="inputDiv">
              <div>Password</div>
              <div>
                <TextField
                  className="textField"
                  variant="outlined"
                  size="small"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </div>
            </div>
            <div className="ButtonDiv">
              {isLogin ? (
                <Button
                  variant="contained"
                  className="LoginButton"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              ) : (
                <Button variant="contained" className="LoginButton" onClick={handleRegister}>
                  SignUp
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="projectNameContainer">❤️ Health is Wealth ❤️</div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
