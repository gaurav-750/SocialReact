import React from 'react';
import styles from '../styles/navbar.module.css';

import { BrowserRouter as Router, Link } from 'react-router-dom';

const Navbar = () => {
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
        <div className={styles.user}>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + 'Images/Gauravspiccropped.png'}
              alt="Profile"
              className={styles.userDp}
            />
            {/* <img src="" alt="" className={styles.userDp} /> */}
          </Link>
          <span> Gaurav </span>
        </div>

        <div className={styles.navLinks}>
          <ul>
            <li>
              <a href="/login"> Log In </a>
            </li>
            {/* <li>
              <a href="/">Log Out</a>
            </li> */}
            <li>
              <a href="/">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
