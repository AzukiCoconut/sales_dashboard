import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';

// This variable is used to prevent the useEffect from running on the first render
const AuthHandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // get token from localStorage
    // if token is expired remove it from localStorage and redirect to login page
    // else set isAuthenticated to true
    // if there is no token set isAuthenticated to false
    const token = localStorage.getItem('id_token');

    if (token) {
      if (AuthService.isTokenExpired(token)) {
        localStorage.removeItem('id_token');
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate, setIsAuthenticated]);

  return null;
};

export default AuthHandler;
