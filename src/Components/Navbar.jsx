import React from 'react';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>

      <div className={styles.rightNav}>
        <div className={styles.user}>
          <a href="/">
            <img
              src={process.env.PUBLIC_URL + 'Images/Gauravspiccropped.png'}
              alt=""
              className={styles.userDp}
            />
            {/* <img src="" alt="" className={styles.userDp} /> */}
          </a>
          <span> Gaurav </span>
        </div>

        <div className={styles.navLinks}>
          <ul>
            <li>
              <a href="/">Log In</a>
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
