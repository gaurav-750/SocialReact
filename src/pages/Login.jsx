import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLogginIn] = useState(false);

  const { addToast } = useToasts();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return addToast('Please enter both email and password!', {
        appearance: 'error',
      });
    }

    setLogginIn(true);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button> Log In </button>
      </div>
    </form>
  );
};

export default Login;
