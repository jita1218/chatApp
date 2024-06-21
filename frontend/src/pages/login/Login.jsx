import { useState } from "react";
import { Link } from "react-router-dom";
import './login.css';
import UseLogin from '../../hooks/UseLogin';

const Login = () => {
  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = UseLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

  return (
    <div className='login'>
      <div className="login_container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <label className='label'>
              <span>Username</span>
            </label>
            <input type='text' placeholder='Enter username'
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form">
						<label className='label'>
							<span >Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
              className="input"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
         
          <Link to="/signup" className='signup'>
          {"Don't"} have an account?
          </Link>
          
          
          <div className="btn_container">
						<button className='btn' 
            disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Login"}
            </button>
			</div>
        </form>      
      </div>
    </div>
  )
}

export default Login
