import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';
import '../components/Styles/Login.css'; // Ensure correct path to your Login.css or appropriate CSS file
import bgImage from '../components/Image/l.jpg';

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const authState = useSelector(state => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [isLoggedIn, navigate, redirectUrl]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      const newErrors = errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {});
      setFormErrors(newErrors);
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  }

  const fieldError = (field) => (
    <p className={`mt-1 text-red-500 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <div className='login-container'>
      <form className='login-form'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2>Welcome user, please login here</h2>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} />
              {fieldError("email")}
            </div>

            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} />
              {fieldError("password")}
            </div>

            <button className='bg-primary text-white px-4 py-2 font-medium rounded-md hover:bg-primary-dark' onClick={handleSubmit}>Submit</button>

            <div className='signup-link'>
              <Link to="/signup" className='text-blue-500'>Don't have an account? Signup here</Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
