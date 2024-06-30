import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'

function Register() {
  const INITIAL_REGISTER_OBJ = {
    name: "",
    emailId: "",
    password: ""
  }

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)
  
  const navigate = useNavigate(); // Use React Router's navigate function for redirection

  const submitForm = async (e) => {
    e.preventDefault()

    // Validation checks before proceeding
    if (registerObj.name.trim() === "") {
      setErrorMessage("Name is required! (use any value)")
      return
    }
    if (registerObj.emailId.trim() === "") {
      setErrorMessage("Email Id is required! (use any value)")
      return
    }
    if (registerObj.password.trim() === "") {
      setErrorMessage("Password is required! (use any value)")
      return
    }

    setErrorMessage("") // Clear previous errors
    setLoading(true) // Set loading to true while fetching data

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: registerObj.name,
          email: registerObj.emailId, 
          password: registerObj.password 
        }) // Corrected JSON.stringify usage
      });

      if (!response.ok) {
        const responseBody = await response.text(); // Get response body for detailed error
        setErrorMessage(`Registration failed: ${responseBody}`);
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Handle successful registration
      localStorage.setItem('token', data.token); // Store the token in localStorage
      setLoading(false);
      navigate('app/settings-profile'); // Redirect to the welcome page using React Router's navigate function

    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
      setLoading(false);
    }
  }

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("") // Clear error message when user types
    setRegisterObj({ ...registerObj, [updateType]: value })
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div className=''>
            <LandingIntro />
          </div>
          <div className='py-24 px-10'>
            <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <InputText
                  type="text" // Correct HTML type for text input
                  defaultValue={registerObj.name}
                  updateType="name"
                  containerStyle="mt-4"
                  labelTitle="Name"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  type="email" // Correct HTML type for email input
                  defaultValue={registerObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  type="password" // Correct HTML type for password input
                  defaultValue={registerObj.password}
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>
              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")} disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
              <div className='text-center mt-4'>
                Already have an account? 
                <Link to="/login">
                  <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
