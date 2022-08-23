import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  const { addToast } = useToasts();
  const auth = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    console.log('inside handlesubmit!', name, email, password, confirmPassword);

    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      addToast('Please fill all the fields', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }

    if (password !== confirmPassword) {
      addToast('Make sure password and confirm password matches', {
        appearance: 'error',
        autoDismiss: true,
      });

      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const res = await auth.signup(name, email, password, confirmPassword);
    console.log('res after auth.signup', res);

    if (res.success) {
      history.push('/login'); //*used to move from the current page to another one
      //*So after this you will move to the login page

      console.log('history', history);

      setSigningUp(false);
      return addToast('User registered successfully, please login now', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      addToast(res.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    setSigningUp(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}> Signup </span>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up..' : 'Signup'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
