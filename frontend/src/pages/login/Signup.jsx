import { useState } from "react";
import "./login.css";
import GenBox from "./GenBox";
import { Link } from "react-router-dom";
import UseSignup from "../../hooks/UseSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = UseSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="login">
      <div className="login_container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <label className="label">
              <span>Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              className="input"
              value={inputs.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form">
            <label className="label">
              <span>Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              className="input"
              value={inputs.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form">
            <label className="label">
              <span>Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="input"
              value={inputs.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form">
            <label className="label">
              <span>Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input"
              value={inputs.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <GenBox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
          <Link to="/login" className="signup">
            Already have an account?
          </Link>
          <div className="btn_container">
            <button className="btn" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign-up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
