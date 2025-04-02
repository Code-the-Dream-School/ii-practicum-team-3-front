import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <h1>Login Page</h1>
      <Link to="/password/reset">Forgot password</Link>
    </>
  );
}

export default Login;
