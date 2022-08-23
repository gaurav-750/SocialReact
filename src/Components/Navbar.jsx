import React from 'react';
import styles from '../styles/navbar.module.css';

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

const Navbar = () => {
  const auth = useAuth(); //AuthContext

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt="Logo"
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/">
              <img
                src={process.env.PUBLIC_URL + 'Images/Gauravspiccropped.png'}
                alt="Profile"
                className={styles.userDp}
              />
              {/* <img src="" alt="" className={styles.userDp} /> */}
            </Link>
            <span> {auth.user.name} </span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log Out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login"> Log In </Link>
                </li>

                <li>
                  <Link to="/signup"> SignUp </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
