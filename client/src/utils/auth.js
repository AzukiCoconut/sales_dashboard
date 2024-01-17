import { jwtDecode } from 'jwt-decode';

class AuthService {
  // get user data
  getProfile() {
    const token = this.getToken();
    if (token) return jwtDecode.default(token);
    return null;
  }

  // get user role
  getRole() {
    const token = this.getToken();
    if (token) {
      const decoded = jwtDecode(token); // No `.default` here
      return decoded.data.role;
    }
    return null;
  }

  // check if user's logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    if (!token) return true;

    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    if (this.isTokenExpired(idToken)) {
      this.logout(); // Clear token if it's expired
    } else {
      localStorage.setItem('id_token', idToken);
      window.location.assign('/');
    }
  }

  //Logout feature remove token from localStorage and redirect to login page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
