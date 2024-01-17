import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';

// This variable is used to prevent the useEffect from running on the first render
const AuthHandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  //This useEffect will run every time the component is rendered\
  //It will check if the token is expired and if it is it will remove it from localStorage
  //and redirect to login page
  useEffect(() => {
    const token = localStorage.getItem('id_token');
    if (AuthService.isTokenExpired(token)) {
      localStorage.removeItem('id_token');
      setIsAuthenticated(false);
      navigate('/login', { replace: true });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate, setIsAuthenticated]);

  return null; // This component don't  render anything
};

export default AuthHandler;
