import { useState } from "react";
import './login.css';
import GenBox from './GenBox';
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

	const {loading,signup} = UseSignup()

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
		// console.log(inputs);
	};
	return (
		<div className='login'>
		  <div className="login_container">
			<h1>Signup
			</h1>
			<form onSubmit={handleSubmit}>
			<div className="form">
							<label className='label'>
								<span >fullName</span>
							</label>
							<input
								type='text'
								placeholder='Enter Full Name'
								className='input'
								value={inputs.fullName}
								onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
							/>
						</div>
			  <div className="form">
							<label className='label'>
								<span >username</span>
							</label>
							<input
								type='text'
								placeholder='Enter username'
								className='input'
								value={inputs.username}
								onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
							/>
						</div>
						<div className="form">
							<label className='label'>
								<span >Password</span>
							</label>
							<input
								type='password'
								placeholder='Enter  Password'
								className='input'
								value={inputs.password}
								onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							/>
						</div>
						
						<div className="form">
							<label className='label'>
								<span >Confirm Password</span>
							</label>
							<input
								type='password'
								placeholder='Confirm Password'
								className='input'
								value={inputs.confirmPassword}
								onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
							/>
						</div>
	
						<GenBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
						<Link to="/login" className='signup'>
				Already have an account? 
			  </Link>
			  
			  <div className="btn_container">
							<button className='btn'disabled={loading} >
								{loading ? <span className="loading loading-spinner"></span> : "Sign-up"}
								</button>
				</div>
			</form>      
		  </div>
		</div>
  )
}

export default Signup
