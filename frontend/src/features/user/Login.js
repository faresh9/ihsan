import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';

function Login() {
  const INITIAL_LOGIN_OBJ = {
    emailId: "",
    password: ""
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    // Validation checks
    if (loginObj.emailId.trim() === "") {
      setErrorMessage("Email Id is required!");
      return;
    }
    if (loginObj.password.trim() === "") {
      setErrorMessage("Password is required!");
      return;
    }

    setErrorMessage(""); // Clear previous errors
    setLoading(true); // Set loading to true while fetching data

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: loginObj.emailId, password: loginObj.password })
      });

      if (!response.ok) {
        const responseBody = await response.text();
        setErrorMessage(`Login failed: ${responseBody}`);
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Handle successful login
      localStorage.setItem('token', data.token);
      setLoading(false);
      navigate('app/welcome');

    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage(""); // Clear error message when user types
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div className=''>
            <LandingIntro />
          </div>
          <div className='py-24 px-10'>
            <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <InputText
                  type="email"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  type="password"
                  defaultValue={loginObj.password}
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>
              <div className='text-right text-primary'>
                <Link to="/forgot-password">
                  <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>
              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className='text-center mt-4'>
                Don't have an account yet? 
                <Link to="/register">
                  <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
